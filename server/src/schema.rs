table! {
    users (bankid_lower) {
        bankid -> Text,
        bankid_lower -> Text,
        username -> Text,
        password_hash -> Text,
        balance -> BigInt,
    }
}
