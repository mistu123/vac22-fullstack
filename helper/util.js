import env from '../env';
const jwt = require('jsonwebtoken');
const secret = env.jwtSecret;

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
};
