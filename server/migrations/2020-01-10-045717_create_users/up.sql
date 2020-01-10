-- Your SQL goes here
CREATE TABLE users (
  bankid TEXT NOT NULL,
  bankid_lower TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  balance UNSIGNED BIG INT DEFAULT 0 CHECK(balance >= 0) NOT NULL
)
