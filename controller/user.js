import express from "express";
import db from "../database";
import User from "../model/user";
import env  from '../env';
import util from '../helper/util';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User registration API
router.post("/register", async (req, res, next) => {
    let user = new User();
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    if(!util.validateRequest(req.body, ['name', 'email', 'password'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            code: 400,
            status: 400
        });
    }
    else {
        // console.log(obj);
        db.query(user.fetchUserDetailsSQL(obj.email), async (error, result) => {
            if (!error) {
                if (!result.length) {
                    bcrypt.hash(obj.password, 10, function (err, hash) {
                        obj.hash = hash;
                        db.query(user.registerUserSQL(obj), async (secondErr, secondData) => {
                            if (!err) {
                                res.status(200).json({
                                    message: 'User Registered successfully!',
                                    status: 200,
                                    emailId: req.body.email
                                    // resourceId: await util.emailSend(obj)
                                });
                            } else {
                                res.status(400).json({
                                    message: 'Bad request! Something went wrong',
                                    status: 200,
                                    emailId: req.body.email
                                });
                            }
                        });
                    });
                } else {
                    res.status(400).json({
                        message: 'Email address already exists',
                        status: 200,
                        emailId: req.body.email
                    });
                }
            } else {
                res.status(500).json({
                    message: 'Something went wrong!',
                    status: 500,
                    emailId: req.body.email
                });
            }
        });
    }
});

// User Login API
router.post("/login", async (req, res, next)=>{
    let user = new User();
    let obj={
        email : req.body.email,
        password : req.body.password
    };
    if(!util.validateRequest(req.body, ['email', 'password'])) {
        res.status(400).json({
            message: "Validation Failed. One or more required parameters are missing",
            code: 400,
            status: 400
        });
    }
    else {
        db.query(user.fetchUserLogin(obj.email), async (error, result) =>{
            // no db query error
            if(!error)
            {
                // if data returned
                if(result.length)
                {
                    // if email checked
                    if(obj.email === result[0].email)
                    {
                        // compare password with bcrypt package
                        bcrypt.compare(obj.password, result[0].password, function(err,ress)
                        {
                            // if password matched
                            if(ress)
                            {
                                res.status(200).json({
                                    message: 'Login successfully!',
                                    status: 200,
                                    accessToken: jwt.sign({
                                        userId: result[0].id,
                                        name: result[0].name,
                                        email: result[0].email
                                    }, env.jwtSecret, {expiresIn: '1d'})
                                });
                            }
                            else
                            {
                                res.status(400).json({
                                    message: 'Password did not match!',
                                    status: 400,

                                });
                            }
                        })
                    }
                    // if email unmatched
                    else {
                        res.status(400).json({
                            message: 'Login Unsuccessfully!',
                            status: 200,
                            emailId: req.body.email
                        });
                    }
                }
                else
                {
                    res.status(400).json({
                        message: 'Email address not found',
                        status: 200,
                        emailId: req.body.email
                    });
                }
            }
            else
            {
                res.status(500).json({
                    message: 'Something went wrong!',
                    status: 500,
                    emailId: req.body.email
                });
            }
        });
    }
});
module.exports = router;
