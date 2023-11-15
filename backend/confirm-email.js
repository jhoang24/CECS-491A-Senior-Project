const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = 'resellu-profile-pics';

'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'

// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

async function verifyAccount(profile){
    const email = profile.email;
    const token = profile.token;


    const dynamoUser = await getEmail(email);
    if(!dynamoUser){
        return util.buildResponse(401, {message: "Email is invalid"});
    }
    
    if(dynamoUser.verified[0] == true){
        return util.buildResponse(500, {message: "Account already verified"});

    }
    if(token == dynamoUser.verified[1]){
        const cleared = await clearListAttribute(dynamoUser.username);

        const updatedToken = await updateToken(dynamoUser.username, token);

    } else {
        return util.buildResponse(403, {message: "Code is incorrect"});
    }
    
    const response = {
        body: { message: "Account has been verified" },
    };
    
    return util.buildResponse(200, response);
    
}

async function getEmail(email) {
    const params = {
        TableName: userTable,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    };

    const response = await dynamodb.query(params).promise();
    if (response.Items.length > 0) {
        return response.Items[0]; // Email exists, return the user
    } else {
        return null; // Email doesn't exist
    }
}

async function clearListAttribute(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set verified = :emptyList",
        ExpressionAttributeValues: {
            ":emptyList": []
        }
    };

    try {
        const response = await dynamodb.update(params).promise();
        return response;
    } catch (error) {
        console.error('There is an error clearing the list: ', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}


async function updateToken(username, token) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set verified = list_append(if_not_exists(verified, :empty_list), :new_values)",
        ExpressionAttributeValues: {
            ":empty_list": [],
            ":new_values": [true, token]
        }
    };

    try {
        const response = await dynamodb.update(params).promise();
        return response;
    } catch (error) {
        console.error('There is an error updating user: ', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}

module.exports.verifyAccount = verifyAccount;