use diesel;
use diesel::prelude::*;
use diesel::result::Error;
use serde::{Deserialize, Serialize};
use super::super::schema::transactions;

#[derive(Clone, Debug, Serialize, Deserialize, AsChangeset, Queryable)]
pub struct Transaction {
    pub id: i32,
    pub from: String,
    pub to: String,
    pub amount: i64,
    pub memo: String,
}

#[derive(Insertable, Clone, Serialize, Deserialize)]
#[table_name = "transactions"]
pub struct InsertableTransaction {
    pub from: String,
    pub to: String,
    pub amount: i64,
    pub memo: String,
}

impl InsertableTransaction {
    pub fn from_transaction(transaction: Transaction) -> InsertableTransaction {
        InsertableTransaction {
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            memo: transaction.memo
        }
    }
}

pub fn all(connection: &SqliteConnection) -> QueryResult<Vec<Transaction>> {
    transactions::table.load::<Transaction>(connection)
}

pub fn get(id: i32, connection: &SqliteConnection) -> QueryResult<Transaction> {
    transactions::table.find(id).get_result::<Transaction>(connection)
}

pub fn insert(transaction: &InsertableTransaction, connection: &SqliteConnection) -> QueryResult<Transaction> {
    connection.transaction::<_, Error, _>(|| {
        diesel::insert_into(transactions::table)
            .values(transaction)
            .execute(connection)?;
        transactions::table
            .order(transactions::columns::id.desc())
            .first(connection)
    })
}

pub fn update(id: i32, transaction: Transaction, connection: &SqliteConnection) -> QueryResult<usize> {
    diesel::update(transactions::table.find(id))
        .set(&transaction)
        .execute(connection)
}

pub fn delete(id: i32, connection: &SqliteConnection) -> QueryResult<usize> {
    diesel::delete(transactions::table.find(id))
        .execute(connection)
}

