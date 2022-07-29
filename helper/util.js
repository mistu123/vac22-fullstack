import env from '../env';
const jwt = require('jsonwebtoken');
const secret = env.jwtSecret;
const axios = require('axios');
const { promisify } = require('util');
const fs = require('fs');
const handlebars = require('handlebars');
const readFile = promisify(fs.readFile);
const SibApiV3Sdk = require('sib-api-v3-sdk');

module.exports = {
    // request validator
    validateRequest(request, validator) {
        let counter = 0;
        validator.forEach((key) => {
            if(request[key]) {
                counter++;
            }
        });
        return counter === validator.length;
    },

    //verify token from header
    verifyToken(req, res) {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            return jwt.verify(req.headers.authorization.split(" ")[1], secret, function (err, decoded) {
                if (err) {
                    res.status(200).json({
                        message: "Bad Request. Invalid token",
                        status: 400,
                        data: err
                    });
                }
                else if((Math.floor((new Date).getTime() / 1000)) >= decoded['exp']) {
                    res.status(200).json({
                        message: "Token Expired, login to continue",
                        status: 400,
                        data: err
                    });
                }
                return decoded;
            });
        }
        else {
            res.status(200).json({
                message: "You are not authorised to request without valid token!",
                status: 400
            });
        }
    },

    // generate random string of n chars
    generateRandomString(n) {
        let c = 'abcdefghijklmnopqrstuvwxyz';
        c += c.toUpperCase()+1234567890;
        return '-'.repeat(n).replace(/./g,b=>c[~~(Math.random()*62)])
    },

    // send email
    emailSend: async function (data) {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;

        let html = await readFile('./templates/invitation.hbs', 'utf8');
        let template = handlebars.compile(html);
        let htmlToSend = template(data);

        // Configure API key authorization: api-key
        const credentials = defaultClient.authentications['api-key'];
        credentials.apiKey = env.emailCredential.apiKey;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        let sendSmtpEmail;
        sendSmtpEmail = {
            replyTo: { email: env.emailCredential.replyto },
            subject: env.emailCredential.subject ,
            sender: { email: env.emailCredential.from, name: env.emailCredential.fromName },
            to: [{email: data.email, // name: 'John Doe'
            }],
            htmlContent: htmlToSend
        };

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {}, function(error) {});
    },
};
