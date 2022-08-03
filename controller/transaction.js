import express from "express";
import db from "../database";
import Transaction from "../model/transaction";
import util from '../helper/util';
import Category from "../model/category";

const router = express.Router();

// Transaction Manage API
router.post("/manage", async (req, res, next) => {
    let transaction = new Transaction();
    let obj = {
        id: req.body.id,
        amount: req.body.amount,
        description: req.body.description,
        categoryId: req.body.categoryId,
        date: req.body.date,
        attachment: req.body.attachment,
        status: req.body.status || 1,
        userId: util.verifyToken(req,res).userId  // get userid from authorization header
    };
    if (!obj.id) {
        obj.transactionId = util.generateRandomString(10);
    }
    // validate request
    if(!util.validateRequest(obj, ['amount', 'date', 'userId', 'categoryId'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            status: 400
        });
    }
    else {
        let category = new Category();
        let request = JSON.parse(JSON.stringify(obj));
        request['id'] = request.categoryId;
        db.query(category.fetchCategoryList(request), async (err, response) => {
            if(!err) {
                if (response.length) {
                    // category create/update based on id existence
                    db.query(transaction.manageTransaction(obj), async (error, result) => {
                        if (!error) {
                            if (result.affectedRows || result.insertId) {
                                res.status(200).json({
                                    message: 'Transaction ' + (obj.id ? 'updated' : 'created') + ' successfully',
                                    status: 200
                                });
                            } else {
                                res.status(404).json({
                                    message: 'Transaction not found!',
                                    status: 404
                                });
                            }
                        } else {
                            res.status(500).json({
                                message: 'Something went wrong in db query of manage transaction!',
                                status: 500
                            });
                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: 'Category not found for this transaction!',
                        status: 404
                    });
                }
            }
            else {
                res.status(500).json({
                    message: 'Something went wrong in db query of category fetch!',
                    status: 500
                });
            }
        });
    }
});

// Delete transaction API
router.post("/delete", async (req, res, next) => {
    let category = new Category();
    let obj = {
        id: req.body.id,

        userId: util.verifyToken(req,res).userId  // get userid from authorization header
    };
    // validate request
    if(!util.validateRequest(obj, ['id'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            status: 400
        });
    }
    else {
        let transaction = new Transaction();
        // delete transaction using status 0
                db.query(transaction.deleteTransaction(obj), async (error, result) => {
                    if (!error) {
                        if (result.affectedRows) {
                            res.status(200).json({
                                message: 'Transaction deleted successfully',
                                status: 200
                            });
                        }
                        else {
                            res.status(500).json({
                                message: 'Transaction not found!',
                                status: 500
                            });
                        }
                    }
                    else {
                        res.status(500).json({
                            message: 'Something went wrong in db query of delete category!',
                            status: 500
                        });
                    }
                });
    }
});

// Fetch Transaction list
router.post("/list", async (req, res, next) => {
    let obj = {
        id: req.body.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        type: req.body.type,
        transaction_id: req.body.transaction_id,
        amount: req.body.amount,
        category_id: req.body.category_id,
        userId: util.verifyToken(req,res).userId  // get userid from authorization header
    };

    // validate request
    if(!util.validateRequest(obj, ['userId'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            status: 400
        });
    }
    else {
        let transaction = new Transaction();
        // Fetch transaction using list
        db.query(transaction.fetchTransactionList(obj), async (error, result) => {
            if (!error) {
                // if transaction id or filter data matched
                if (result.length) {
                    res.status(200).json({
                        message: 'Transaction list fetch successfully',
                        status: 200,
                        result
                    });
                } else {
                    res.status(500).json({
                        message: 'Record not found!',
                        status: 500
                    });
                }
            } else {

                res.status(500).json({
                    message: 'Something went wrong in db query of filter transaction!',
                    status: 500
                });
            }
        });
    }
});

module.exports = router;
