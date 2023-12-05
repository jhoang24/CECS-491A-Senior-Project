const AWS = require("aws-sdk");
const s3 = new AWS.S3();

'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
const BUCKET_NAME = 'resellu-product-listing-images';

const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';
const listingsTable = '491_listings';

async function checkPasswordMatch(request){
     const params = {
        TableName: userTable,
        Key: {
            'username': request.username
        }
    };


    const user = await dynamodb.get(params).promise();

    if (!user.Item) {
        return { statusCode: 404, body: 'User not found' };
    }

    const storedPasswordHash = user.Item.password; 
    const enteredPassword = request.password; 
    const passwordMatches = await bcrypt.compare(enteredPassword, storedPasswordHash);

    if (passwordMatches) {
        return util.buildResponse(200, passwordMatches);
    }
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":  "*"
      },
      body:  JSON.stringify({
            message: "Password didn't match"
            }),
    };
    
    return response

}

async function deleteAccount(deleteUser){
    const user = await getUser(deleteUser)
    
    // Deletes all of user's selling from s3
    await Promise.all(user.selling.map(listingID => deleteImageFromS3(listingID)));
    
    // Deletes all items of user from dynamodb
    await Promise.all(user.selling.map(listingID => deleteImageFromDB(listingID)));

    const userTableParams = {
        TableName: userTable,
        Key: {
            username: deleteUser,
        },
    };
    
    // Deletes user by username key
    await dynamodb.delete(userTableParams).promise();
    
    const response = {
         statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type":  "*"
          },
        body: { message: 'Account deleted successfully' },
    };
    
    return util.buildResponse(200, response);
    
}

// Retrieves user dynamodb object given a username
async function getUser(username){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        },
    };

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There is an error getting user: ', error)
    })
    
}

// Deletes all images in s3 folder when given a listingID
async function deleteImageFromS3(listingID){
    //Delete the folder from S3
    const s3Params = {
      Bucket: BUCKET_NAME,
      Prefix: `${listingID}/`,
    };
    
    const objects = await s3.listObjectsV2(s3Params).promise();

    if (objects.Contents.length === 0) {
        console.log('Folder is empty. No objects to delete.');
    } else {
        // Delete each object within the folder
        const deleteObjectsParams = {
            Bucket: BUCKET_NAME,
            Delete: { Objects: objects.Contents.map(obj => ({ Key: obj.Key })) },
        };

        await s3.deleteObjects(deleteObjectsParams).promise();
        console.log('Folder and its contents deleted successfully.');
    }
}

// Deletes item from dynamoDB given a listingID
async function deleteImageFromDB(listingID){
    const params = {
        TableName: listingsTable,
        Key: {
            uuid: listingID
        },
    };

    await dynamodb.delete(params).promise();
}
module.exports.checkPasswordMatch = checkPasswordMatch;
module.exports.deleteAccount = deleteAccount;
