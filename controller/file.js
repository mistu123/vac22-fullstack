import express from "express";
const fs = require('fs');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
import env from '../env';

aws.config.update({
    secretAccessKey: env.awsCredential.SECRET_KEY,
    accessKeyId: env.awsCredential.ACCESS_ID,
    region: env.awsCredential.REGION,
});
const s3 = new aws.S3();

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
            || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: env.awsCredential.BUCKET_NAME,
        key: function (req, file, cb) {
            req.file = Date.now() +'-'+ file.originalname;
            cb(null, Date.now() +'-'+ file.originalname);
        }
    })
});

// register route
router.post('/upload', upload.array('file', 1), (req, res) => {
    res.status(200).json({
        message: 'File uploaded successfully!',
        status: 200,
        resourceObject: 'https://' + env.awsCredential.BUCKET_NAME + '.s3.' + env.awsCredential.REGION + '.amazonaws.com/' + req.file
    });
});

module.exports = router;
