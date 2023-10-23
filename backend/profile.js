const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = 'resellu-profile-pics';

// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');
const auth = require('./auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

async function edit_profile(profile){
    const username = profile.username;
    const password = profile.password;
    const newPassword = profile.newPassword;

    const image = profile.image;
    if(!username){
        return util.buildResponse(401, {
            message: 'username is required'
        })
    }
    
    // if(username){
    //     changeUsername(newnName);
    // }
    if(password){
        changePassword(newPassword);
    }
    if(image){
        // const base64File = image.file;
    const decodedFile = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const params = {
        Bucket: BUCKET_NAME,
        Key: `images/${username}.jpeg`,
        Body: decodedFile,
        ContentType: "image/jpeg",
    };

    const uploadResult = await s3.putObject(params).promise();
    
    
    }
    
    const response = {
        isBase64Encoded: false,
        // image: fromS3,
        body: { message: "it works" },
    };
    
    return util.buildResponse(200, response);
    
}

async function get_profile(profile){
    const username = profile.username;
    // const username = "diamond"

    // const fromS3 = await getImage(`images/diamond.jpeg`);
    const fromS3 = await getImage(`images/${username}.jpeg`);
    
    const dynamoUser = await getUser(username);
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":  "*"
      },
      isBase64Encoded: true,
      body:  JSON.stringify({
        user: dynamoUser,
        picture: fromS3.toString('base64')
            }),
    };

    return response;
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

module.exports.edit_profile = edit_profile;
module.exports.get_profile = get_profile;