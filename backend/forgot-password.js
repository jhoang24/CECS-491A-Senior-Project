//link is routed like profile/listing that send username/email/whatever
//new password

var aws = require('aws-sdk');
const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const BUCKET_NAME = 'resellu-profile-pics';

const dynamodb = new aws.DynamoDB.DocumentClient();
const userTable = '491-users';

async function sendMail(userInfo) {
  const email = userInfo.email;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'resellu.help@gmail.com',
      pass:  process.env.gmail_password,
    },
  });
  // var token;
  //generate link with token to change password
  const token = require('crypto').randomBytes(32).toString('hex');
  
  const dynamoUser = await getEmail(email);
  
  const clearList = await clearListAttribute(dynamoUser.username, token);

  const updatedToken = await updateToken(dynamoUser.username, token);
  const url = 'http://localhost:4200/public/confirm-password?token=' + token + '&email='+ dynamoUser.email;

  const mailOptions = {
    from: 'resellu.help@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click the link below to reset your password:</p><a href="${url}">Reset Password</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return util.buildResponse(200, {message: url});
  } catch (error) {
    return util.buildResponse(500, {message: error.message});
  }
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


async function updateToken(username, token) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
        UpdateExpression: "set PasswordToken = list_append(if_not_exists(PasswordToken, :empty_list), :new_values)",
        ExpressionAttributeValues: {
            ":empty_list": [],
            ":new_values": [token, Date.now(), false]
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

// async function updateToken(username, updatedToken, index) {
//     const params = {
//         TableName: userTable,
//         Key: {
//             username: username
//         }
//     };

//     try {
//         // Fetch the existing user data from DynamoDB
//         const data = await dynamodb.get(params).promise();
        
//         if (data && data.Item && data.Item.PasswordToken && data.Item.PasswordToken[index]) {
//             // Update the specific element in the list
//             data.Item.PasswordToken[index] = updatedToken;

//             // Update the user record with the modified list
//             params.UpdateExpression = "set PasswordToken = :updatedToken";
//             params.ExpressionAttributeValues = {
//                 ":updatedToken": data.Item.PasswordToken
//             };

//             // Perform the update
//             const response = await dynamodb.update(params).promise();
//             return response;
//         } else {
//             console.error('User or list element not found.');
//             return null; // Handle the case where the user or list element doesn't exist
//         }
//     } catch (error) {
//         console.error('There is an error updating user: ', error);
//         throw error; // Rethrow the error to handle it at a higher level
//     }
// }


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

module.exports.sendMail = sendMail;
