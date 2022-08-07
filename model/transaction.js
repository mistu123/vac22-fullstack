import moment from 'moment';

class Transaction {
    constructor() {}

    // fetch transaction list all / by specific category id
    checkTransactionList(obj) {
        let sql = `SELECT * FROM expense_transaction as ext LEFT JOIN expense_category as exc `+
            `ON ext.category_id = exc.id where ext.user_id = '${obj.userId}' AND ext.status = '${1}'`;
        if (obj.id) {
            sql = sql + ` AND exc.id = '${obj.id}'`;
        }
        return sql;
    }

    // manage transaction
    manageTransaction(obj) {
        let sql = '';
        // if transaction id exists
        if (obj.id) {
            sql = `UPDATE expense_transaction set amount ='${obj.amount}', category_id ='${obj.categoryId}', `+
                `description ='${obj.description}', date ='${obj.date}',status ='${obj.status}',`+
                `updated_on ='${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}',` +
                `attachment = '${obj.attachment}' where user_id = '${obj.userId}' AND id = '${obj.id}'`;
        }
        else {
            sql = `INSERT INTO expense_transaction (amount, description, category_id, user_id, date,`+
                ` status, attachment, transaction_id) VALUES (`+
                `'${obj.amount}', '${obj.description || ''}', '${obj.categoryId}', '${obj.userId}',`+
                `'${obj.date}','${obj.status}', '${obj.attachment || ''}', '${obj.transactionId}')`;
        }
        return sql;
    }

    // Delete Transaction by updating status
    deleteTransaction(obj) {
        let  sql = `UPDATE expense_transaction set status ='${0}' where user_id = '${obj.userId}' AND id = '${obj.id}'`;
        return sql;
    }

    // fetch transaction(s) list
    fetchTransactionList(obj) {
        let sql = `SELECT exc.name, exc.type, ext.* FROM expense_transaction as ext LEFT JOIN expense_category`+
            ` as exc ON ext.category_id = exc.id WHERE ext.status = '${1}' AND ext.user_id = '${obj.userId}'` ;
        let conditionalCount = 0;

        if (obj.id) {
            conditionalCount += 1;
            sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.id = '${obj.id}'`;
        }
        else {
            if (obj.startDate && obj.endDate) {
                conditionalCount += 1;
                sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.date BETWEEN '${obj.startDate}' AND '${obj.endDate}'`
            }
            if (obj.status === 0 || obj.status) {
                conditionalCount += 1;
                sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.status = '${obj.status}'`;
            }
            if (obj.amount) {
                conditionalCount += 1;
                sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.amount = '${obj.amount}'`;
            }
            if (obj.category_id) {
                conditionalCount += 1;
                sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.category_id = '${obj.category_id}'`
            }
            if (obj.transaction_id) {
                conditionalCount += 1;
                sql = sql + (conditionalCount > 0 && ` AND`) + ` ext.transaction_id = '${obj.transaction_id}'`
            }
        }
        return sql;
    }
}
export default Transaction;
