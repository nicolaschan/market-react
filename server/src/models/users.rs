use diesel;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use super::super::schema::users;

#[derive(Clone, Serialize, Deserialize, AsChangeset, Queryable)]
pub struct User {
    pub bankid: String,
    pub bankid_lower: String,
    pub username: String,
    pub password_hash: String,
    pub balance: i64,
}

impl User {
    pub fn new(username: String, bankid: String, password: String) -> Result<User, String> {
        Ok(User {
            bankid: bankid.clone(),
            bankid_lower: bankid.to_lowercase(),
            username: username,
            password_hash: argon2::hash_encoded(password.as_bytes(), b"saltanotehusaothuasote", &argon2::Config::default()).unwrap(),
            balance: 0,
        })
    }
}

#[derive(Insertable)]
#[table_name = "users"]
struct InsertableUser {
    bankid: String,
    bankid_lower: String,
    username: String,
    password_hash: String,
}

impl InsertableUser {
    fn from_user(user: User) -> InsertableUser {
        InsertableUser {
            bankid: user.bankid,
            bankid_lower: user.bankid_lower,
            username: user.username,
            password_hash: user.password_hash,
        }
    }
}

pub fn all(connection: &SqliteConnection) -> QueryResult<Vec<User>> {
    users::table.load::<User>(connection)
}

pub fn get(bankid: String, connection: &SqliteConnection) -> QueryResult<User> {
    users::table.find(bankid).get_result::<User>(connection)
}

pub fn insert(user: User, connection: &SqliteConnection) -> QueryResult<usize> {
    diesel::insert_into(users::table)
        .values(&InsertableUser::from_user(user))
        .execute(connection)
}

pub fn update(bankid: String, user: User, connection: &SqliteConnection) -> QueryResult<usize> {
    diesel::update(users::table.find(bankid))
        .set(&user)
        .execute(connection)
}

pub fn delete(bankid: String, connection: &SqliteConnection) -> QueryResult<usize> {
    diesel::delete(users::table.find(bankid))
        .execute(connection)
}

