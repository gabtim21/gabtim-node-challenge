const AWS = require('aws-sdk')

const connection = new AWS.DynamoDB.DocumentClient()

module.exports = connection