use diesel::prelude::*;
use std::ops::Deref;
use r2d2_diesel::ConnectionManager;
use rocket::http::Status;
use rocket::request::{Request, FromRequest, State, Outcome};

// Reference: https://lankydan.dev/2018/05/20/creating-a-rusty-rocket-fuelled-with-diesel
type Pool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn init_pool() -> Pool {
    let manager = ConnectionManager::<SqliteConnection>::new("market.db");
    Pool::new(manager).expect("db pool")
}

pub struct DbConn(pub r2d2::PooledConnection<ConnectionManager<SqliteConnection>>);

impl <'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();
    fn from_request(request: &'a Request<'r>) -> Outcome<DbConn, Self::Error> {
        let pool = request.guard::<State<Pool>>()?;
        match pool.get() {
            Ok(conn) => Outcome::Success(DbConn(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ()))
        }
    }
}

impl Deref for DbConn {
    type Target = SqliteConnection;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

