table! {
    transactions (id) {
        id -> Integer,
        from -> Text,
        to -> Text,
        amount -> BigInt,
        memo -> Text,
    }
}

table! {
    users (bankid_lower) {
        bankid -> Text,
        bankid_lower -> Text,
        username -> Text,
        password_hash -> Text,
        balance -> BigInt,
    }
}

allow_tables_to_appear_in_same_query!(
    transactions,
    users,
);
