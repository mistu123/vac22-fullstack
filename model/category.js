class Category {
    constructor() {}

    // Manage category
    manageCategory(obj) {
        let sql = '';
        // if category id exists
        if (obj.id) {
            sql = `UPDATE expense_category set name ='${obj.name}', description ='${obj.description}', status ='${obj.status}' `+
                `where user_id = '${obj.userId}' AND id = '${obj.id}'`;
        }
        // if new category / no category id
        else {
            sql = `INSERT INTO expense_category (name, description, user_id, status) VALUES (`+
                `'${obj.name}', '${obj.description}', '${obj.userId}', '${obj.status}');`;
        }
        return sql;
    }

    // fetch category list all / by specific id
    fetchCategoryList(obj) {
        let sql = `SELECT * FROM expense_category WHERE user_id = '${obj.userId}' AND status = '${1}'`;
        // if category id exits
        if (obj.id) {
            sql = sql + ` AND id = '${obj.id}'`;
        }
        return sql;
    }

    // delete category by id
    deleteCategory(obj)
    {
        let sql = `DELETE  FROM expense_category WHERE id = '${obj.id}'`;
        return sql;
    }
}
export default Category;
