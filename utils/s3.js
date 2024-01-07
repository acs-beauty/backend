const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-north-1',
  signatureVersion: 'v4',
})

module.exports = s3
