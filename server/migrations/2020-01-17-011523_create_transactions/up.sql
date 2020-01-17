-- Your SQL goes here
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  'from' TEXT NOT NULL,
  'to' TEXT NOT NULL,
  amount BIGINT NOT NULL,
  memo TEXT NOT NULL,
  FOREIGN KEY('from') REFERENCES users(bankid),
  FOREIGN KEY('to') REFERENCES users(bankid)
)
