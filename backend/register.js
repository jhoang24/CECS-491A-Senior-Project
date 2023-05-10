const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');

const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

async function register(userInfo){
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    // if(!username || !email || !password){
    //     return util.buildResponse(401, {
    //         message: 'All fields are rrequired'
    //     })
    // }

    // const dynamoUser = await getUser(username);
    // if (dynamoUser && dynamoUser.username){
    //     return util.buildResponse(401, {
    //         message: 'username already exists'
    //     })
        
    // }
    
    const encryptedPW = bcrypt.hashSync(password.trim(),10);
    const user = {
        email: email,
        username: username,
        password: encryptedPW
    }
    
    const params = {
        TableName: userTable,
        Item: user
    }
    
    try {
    await dynamodb.put(params).promise();
    return { body: 'Successfully created item!' }
    } catch (err) {}
    
    const savedUserResponse = await saveUser(user);
    if(!savedUserResponse){
        return util.buildResponse(503, {message: 'Server error'});
    }
    return util.buildResponse(200,{username: username});
}
// async function getUser(username){
//     const params = {
//         TableName: userTable,
//         Key: {
//             username: username
//         }
//     }
//     return await dynamodb.get(params).promise().then(response => {
//         return response.Item;
//     }, error =>{
//         console.error('There is an error getting user: ', error);
//     })
// }

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