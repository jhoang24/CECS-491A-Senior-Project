const AWS = require("aws-sdk");
// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

const s3 = new AWS.S3();
const BUCKET_NAME = 'resellu-profile-pics';


async function login(user){
    const username = user.username;
    const password = user.password;
    if(!user || !username || !password){
        return util.buildResponse(401, {
            message: 'username and password are require'
        })
    }


    const dynamoUser = await getUser(username);
    if(!dynamoUser || !dynamoUser.username){
        return util.buildResponse(403, {message: 'user does not exist'});
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)){
        return util.buildResponse(403, {message: 'password is incorrect'});
    }

    const userInfo = {
        username: dynamoUser.username
    }
    
    const fromS3 = await getImage(`images/${username}.jpeg`);
    
    // const response = {
    //   statusCode: 200,
    //   headers: {
    //     "Content-Type":  "*"
    //   },
    //   isBase64Encoded: true,
    //   body:  JSON.stringify({
    //     user: dynamoUser,
    //     picture: fromS3.toString('base64')
    //         }),
    // };
    
    const token = auth.generateToken(userInfo);
    const response = {
        user: userInfo,
        token: token,
        picture: fromS3.toString('base64')
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
        console.error('There is an error getting user: ', error)
    })
}

async function getImage(image){
    var params = { Bucket: BUCKET_NAME, Key: image };
    return await s3.getObject(params).promise().then(response => {
        return response.Body;
    }, error =>{
        console.error('There is an error getting user: ', error)
    })
}

module.exports.login = login;