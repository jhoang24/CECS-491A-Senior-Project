const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });
const util = require('./utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const listingsTable = '491_listings';
const userTable = '491-users';

async function send_email(requestBody) {
  try {
    const { recipientEmail, subject, message, sourceEmail, listingUuid } = requestBody;
    
    // Gets email from logged-in username 
    const dynamoEmail = await getEmail(sourceEmail);
    
    // Gets email from listing's owner
    const dynamoEmail_recipient = await getEmail(recipientEmail);
    
    // Gets listing's name from that listing's uuid
    const dynamoItemName = await getListingName(listingUuid);
    
    // Compose the email parameters
    const emailParams = {
      Destination: {
        ToAddresses: [dynamoEmail_recipient],
      },
      Message: {
        Body: {
          Text: {
            Data: message,
          },
        },
        Subject: {
          Data: subject + ": " + dynamoItemName,
        },
      },
      Source: dynamoEmail, // This is logged in user email
    };

    // Send the email using Amazon SES
    const result = await ses.sendEmail(emailParams).promise();

    // Set CORS headers
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully from lambda from ' + dynamoEmail, result }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };

    return response;
  } catch (error) {
    // Handle errors and set CORS headers
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };

    return response;
  }
}

async function getEmail(username) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: userTable,
      Key: {
        username: username,
      },
      ProjectionExpression: 'email',
    };

    // Query DynamoDB to get the email for the given username
    dynamodb.get(params, (err, data) => {
      if (err) {
        console.error('Error getting item from DynamoDB:', err);
        reject(err);
      } else {
        if (data.Item && data.Item.email) {
          const email = data.Item.email;
          console.log('Email from the database:', email);
          resolve(email);
        } else {
          console.log('Email not found for the specified username.');
          reject('Email not found');
        }
      }
    });
  });
}

async function getListingName(uuid) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: listingsTable, // Replace with your actual DynamoDB table name
      Key: {
        uuid: uuid,
      },
      ProjectionExpression: 'itemName',
    };

    // Query DynamoDB to get the itemName for the given uuid
    dynamodb.get(params, (err, data) => {
      if (err) {
        console.error('Error getting item from DynamoDB:', err);
        reject(err);
      } else {
        if (data.Item && data.Item.itemName) {
          const itemName = data.Item.itemName;
          console.log('Item Name from the database:', itemName);
          resolve(itemName);
        } else {
          console.log('Item Name not found for the specified uuid.');
          reject('Item Name not found');
        }
      }
    });
  });
}


module.exports.send_email = send_email;
