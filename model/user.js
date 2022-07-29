class User {
    constructor() {}

    // register user
    registerUserSQL(obj) {
        let sql = `INSERT INTO expense_user (name, email, password) VALUES (`+
            `'${obj.name}', '${obj.email}', '${obj.hash}');`;
        return sql;
    }

    // fetch user details
    fetchUserDetailsSQL(email) {
        let sql = `SELECT * FROM expense_user as user where user.email = '${email}'`;
        return sql;
    }

    // fetch users list
    fetchUserList() {
        let sql = `SELECT * FROM expense_user ORDER BY id DESC`;
        return sql;
    }

    fetchUserLogin(email)
    {
        let sql = `SELECT * FROM expense_user WHERE email = '${email}'`;
        return sql;
    }
}
export default User;
