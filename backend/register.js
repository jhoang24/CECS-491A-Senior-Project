
const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');

const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

const s3 = new AWS.S3();
const BUCKET_NAME = 'resellu-profile-pics';

async function register(userInfo){
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    const defaultPic = "data:image/png;base64,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";

    
    if (!username || !email || !password) {
        return util.buildResponse(401, {
            message: 'All fields are required'
        });
    }
    
    
    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username){
        return util.buildResponse(403, {message: 'username already exists'})
        
    }
    
    const dynamoEmail = await getEmail(email);
    if (dynamoEmail) {
        return util.buildResponse(403, { message: 'Email already exists' });
    }
    
    const encryptedPW = bcrypt.hashSync(password.trim(),10);
    const user = {
        email: email,
        username: username,
        password: encryptedPW
    }
    
    // const params = {
    //     TableName: userTable,
    //     Item: user
    // }
    
    // try {
    // await dynamodb.put(params).promise();
    // return { body: 'Successfully created item!' }
    // } catch (err) {}
    
    const savedUserResponse = await saveUser(user);
    if(!savedUserResponse){
        return util.buildResponse(503, {message: 'Server error'});
    }
    const decodedFile = Buffer.from(defaultPic.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const params = {
        Bucket: BUCKET_NAME,
        Key: `images/${username}.jpeg`,
        Body: decodedFile,
        ContentType: "image/jpeg",
    };

    const uploadResult = await s3.putObject(params).promise();
    
    const response = {
        user: userInfo
    }
    return util.buildResponse(200, response);
}
async function getUser(username){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There is an error getting user: ', error);
    })
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


async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error =>{
        console.error('There is an error saving user: ', error);
    })
}

module.exports.register = register;
