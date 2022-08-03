import express from "express";
import db from "../database";
import Category from "../model/category";
import util from '../helper/util';
const router = express.Router();
import Transaction from '../model/transaction';

// Category Manage API
router.post("/manage", async (req, res, next) => {
    let category = new Category();
    let obj = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        status: req.body.status || 1,
        userId: util.verifyToken(req,res).userId  // get userid from authorization header
    };
    // validate request
    if(!util.validateRequest(obj, ['name', 'description', 'userId', 'type'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            status: 400
        });
    }
    else {
        // category create/update based on id existence
        db.query(category.manageCategory(obj), async (error, result) => {
            if (!error) {
                if (result.affectedRows || result.insertId) {
                    res.status(200).json({
                        message: 'Category ' + (obj.id ? 'updated' : 'created') + ' successfully',
                        status: 200,
                        result
                    });
                } else {
                    res.status(500).json({
                        message: 'Category not found!',
                        status: 500
                    });
                }
            } else {
                res.status(500).json({
                    message: 'Something went wrong in db query!',
                    status: 500
                });
            }
        });
    }
});

// Category Manage API
router.post("/list", async (req, res, next) => {
    let category = new Category();
    let obj = {
        id: req.body.id,
        status: req.body.status,
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
        // category create/update based on id existence
        db.query(category.fetchCategoryList(obj), async (error, result) => {
            if (!error) {
                res.status(200).json({
                    message: result.length ? 'Category list fetched successfully' : 'Category list not found',
                    status: 200,
                    result
                });
            } else {
                res.status(500).json({
                    message: 'Something went wrong in db query!',
                    status: 500
                });
            }
        });
    }
});

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
        // check if transactions exist
        db.query(transaction.checkTransactionList(obj), async (err, response) => {
            if (!err) {
                // if exists
                if (response.length) {
                    res.status(401).json({
                        message: "One or more transactions exist for this category",
                        status: 401
                    });
                }
                else {
                    // category delete based on id existence
                    db.query(category.deleteCategory(obj), async (error, result) => {
                        if (!error) {
                            if (result.affectedRows || result.insertId) {
                                res.status(200).json({
                                    message: 'Category deleted successfully',
                                    status: 200
                                });
                            } else {
                                res.status(500).json({
                                    message: 'Category not found!',
                                    status: 500
                                });
                            }
                        } else {
                            res.status(500).json({
                                message: 'Something went wrong in db query of delete category!',
                                status: 500
                            });
                        }
                    });
                }
            }
            else {
                res.status(500).json({
                    message: 'Something went wrong in db query of transaction fetch!',
                    status: 500
                });
            }
        });
    }
});

module.exports = router;
