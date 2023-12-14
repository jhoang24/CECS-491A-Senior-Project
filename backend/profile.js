const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = 'resellu-profile-pics';

// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';

async function edit_profile(profile){
    const username = profile.username;
    const newUsername = profile.newUsername;
    const password = profile.password;
    const passwordToken = profile.passwordToken;
    const newPassword = profile.newPassword;
    //new password confirm token?

    const image = profile.image;
    if(!username){
        return util.buildResponse(401, {
            message: 'username is required'
        })
    }
    
    // if(username){
    //     changeUsername(newnName);
    // }
    
    const dynamoUser = await getUser(username);
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
    // var s = "not changed";
    
    // if(newUsername != username){
    //     const userCheck = await getUser(newUsername);
    //     if(userCheck){
    //         return util.buildResponse(401, {
    //             message: 'username already exist'
    //         })
    //     }
    //     const newUser = await changeUsername(newUsername);
    //     s = "changed";
    // }

    
    
    const response = {
        body: { message: "Information Changed"},
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
         // Commented out user for testing
        user: dynamoUser.username,
        email: dynamoUser.email,
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
  
async function changeUsername(username,newUsername){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set username = :x",
        ExpressionAttributeValues: {
            ":x": newUsername
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

// async function getEmailForProfile(requestBody) {
//   const username = requestBody.username;

//   const params = {
//     TableName: userTable,
//     Key: {
//       'username': username,
//     },
//   };

//   try {
//     const data = await dynamodb.get(params).promise();
//     const user = data.Item;

//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(user),
//       headers: {
//         'Access-Control-Allow-Origin': '*', // Allow requests from any origin
//         'Access-Control-Allow-Credentials': true,
//       },
//     };

//     return response;
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Internal Server Error' }),
//       headers: {
//         'Access-Control-Allow-Origin': '*', // Allow requests from any origin
//         'Access-Control-Allow-Credentials': true,
//       },
//     };
//   }
// }


module.exports.edit_profile = edit_profile;
module.exports.get_profile = get_profile;
// module.exports.getEmailForProfile = getEmailForProfile;