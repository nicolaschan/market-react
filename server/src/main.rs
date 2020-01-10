#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
use rocket_contrib::databases::diesel;
use serde::{Deserialize, Serialize};
use rocket_contrib::json::Json;
use rocket_contrib::serve::StaticFiles;
use std::path::Path;
use std::ops::Deref;
use r2d2_diesel::ConnectionManager;
use rocket::http::{RawStr, Status};
use rocket::response::{NamedFile, status};
use rocket::request::{Request, FromRequest, State, Outcome};
use pwned::api::*;


use market_server::connection::DbConn;
use market_server::models::users;
use market_server::models::users::User;

#[derive(Serialize, Deserialize)]
pub struct StatusResponse {
    pub success: bool,
    pub message: Option<String>
}

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/users")]
fn get_all_users(conn: MarketDbConn) -> Json<Vec<User>> {
    users::all(&conn).map(|users| Json(users)).unwrap_or(Json(Vec::new()))
}

#[get("/users/<bankid>")]
fn get_user_by_bankid(bankid: &RawStr, conn: MarketDbConn) -> Result<Json<User>, status::NotFound<()>> {
    users::get(bankid.to_string(), &conn)
        .map(Json)
        .map_err(|_| status::NotFound(()))
}

fn user_created(user: User) -> status::Created<Json<User>> {
    status::Created(
        format!("/users/{id}", id = user.bankid).to_string(),
        Some(Json(user)))
}

#[derive(Serialize, Deserialize)]
struct PostUser {
    username: String,
    bankid: String,
    password: String
}

#[post("/users", data = "<input>")]
fn create_user(input: Json<PostUser>, conn: MarketDbConn) -> Result<status::Created<Json<User>>, status::Custom<String>> {
    let post_user = input.into_inner();
    let user = match User::new(post_user.username, post_user.bankid, post_user.password) {
        Ok(user) => user,
        Err(_) => return Err(status::Custom(Status::ImATeapot, "hi".to_string()))
    };
    users::insert(user.clone(), &conn)
        .map(|_| user_created(user))
        .map_err(|_| status::Custom(Status::ImATeapot, "hi".to_string()))
}

#[get("/passwords/<password>")]
fn check_pwned_password(password: &RawStr) -> Json<bool> {
    let pwned = PwnedBuilder::default().build().unwrap();
    match pwned.check_password(password.to_string()) {
        Ok(pwd) => Json(pwd.found),
        Err(_e) => Json(false)
    }
}

#[catch(404)]
fn not_found(_req: &Request) -> Option<NamedFile> {
    NamedFile::open(Path::new("../build/index.html")).ok()
}

#[database("sqlite_market")]
struct MarketDbConn(diesel::SqliteConnection);

fn main() {
    rocket::ignite()
        .attach(MarketDbConn::fairing())
        .mount("/", StaticFiles::from("../build"))
        .mount("/api/v1/", routes![index, create_user, get_user_by_bankid, get_all_users, check_pwned_password])
        .register(catchers![not_found])
        .launch();
}
