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

async function update(profile){
    const email = profile.email;
    const password = profile.password;
    const passwordToken = profile.token;

    const dynamoUser = await getEmail(email);
    if(passwordToken && password){
        if(dynamoUser.PasswordToken[0] == passwordToken && dynamoUser.PasswordToken[2] == false){
            if(dynamoUser.PasswordToken[1] - Date.now() > 3600000){
                return util.buildResponse(500, {message: "The link has expired"});

            }
        const encryptedPW = bcrypt.hashSync(password.trim(),10);

        const passwordMessage = await changePassword(dynamoUser.username, encryptedPW);
        const cleared = await clearListAttribute(dynamoUser.username);

        const updatedToken = await updateToken(dynamoUser.username, dynamoUser.PasswordToken[0], true);

        } else {
            return util.buildResponse(500, {message: "The link has already been used"});
        }
    }
    const response = {
        body: { message: "Password has been changed" },
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
  
async function changePassword(username,password){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set password = :x",
        ExpressionAttributeValues: {
            ":x": password
        }
    };

    return await dynamodb.update(params).promise().then(response => {
        return response;
    }, error =>{
        console.error('There is an error getting user: ', error)
    })
}


async function clearListAttribute(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set PasswordToken = :emptyList",
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


async function updateToken(username, token, used) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set PasswordToken = list_append(if_not_exists(PasswordToken, :empty_list), :new_values)",
        ExpressionAttributeValues: {
            ":empty_list": [],
            ":new_values": [token, Date.now(), used]
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

module.exports.update = update;