class Category {
    constructor() {}

    // Manage category
    manageCategory(obj) {
        let sql = '';
        // if category id exists
        if (obj.id) {
            sql = `UPDATE expense_category set name ='${obj.name}', description ='${obj.description}', type ='${obj.type}',`+
                `status ='${obj.status}' where user_id = '${obj.userId}' AND id = '${obj.id}'`;
        }
        // if new category / no category id
        else {
            sql = `INSERT INTO expense_category (name, description, type, user_id, status) VALUES (`+
                `'${obj.name}', '${obj.description}', '${obj.type}', '${obj.userId}', '${obj.status}');`;
        }
        return sql;
    }

    // fetch category list all / by specific id
    fetchCategoryList(obj) {
        let sql = `SELECT exc.*, (select count(*) from expense_transaction ext `+
            `WHERE exc.id = ext.category_id and ext.user_id = `+ `'${obj.userId}' `+
            `and ext.status = '${1}') as transactions FROM expense_category as exc `+
            `WHERE user_id = '${obj.userId}'`;
        // if category id exits
        if (obj.id) {
            sql = sql + ` AND id = '${obj.id}'`;
        }
        if (obj.status) {
            sql = sql + ` AND status = '${obj.status}'`;
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
