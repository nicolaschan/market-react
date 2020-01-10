#[macro_use] extern crate diesel;

use diesel::Connection;
use diesel::sqlite::SqliteConnection;

pub fn establish_connection() -> SqliteConnection {
    SqliteConnection::establish("market.db").expect("db establish error")
}

pub mod models;
pub mod schema;
pub mod connection;
