import User from '../model/user';
import db from "../database";
import util from "../helper/util";
const fs = require("fs");
// cron module
const cron = require('node-cron');

const task = cron.schedule('* * * * *', () => {
    sendEmailToUser();
});
task.start();


// send email to all users
const sendEmailToUser = () => {
    const user = new User();
    db.query(user.fetchUserList(), async (error, result) => {
        if (!error) {
            // if users available
            if (result.length) {
                result.forEach(async (key) => {
                    await util.emailSend(key)
                });
            }
        } else {
            // if error in query
            fs.appendFile("logs.txt", error, function(err) {
                if (err) throw err;
                console.log("Status Logged!");
            });
        }
    });
};
