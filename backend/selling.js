const AWS = require("aws-sdk");
const s3 = new AWS.S3();

'Access-Control-Allow-Origin', '*',
'Access-Control-Allow-Methods', '*'

const BUCKET_NAME = 'resellu-product-listing-images';
const util = require('./utils');
const auth = require('./auth');
const bcrypt = require('bcryptjs');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';
const listingsTable = '491_listings';

// Takes in a username to query for user. It then returns all of what the user is selling
async function getItem(request){
    const user = await getUser(request)
    
    const listingsArray = await Promise.all(user.selling.map(element => getListings(element)));

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":  "*"
      },
      body:  JSON.stringify({
            userSelling: listingsArray
            }),
    };
    return response;
}

// Takes in a user's listingID and a soldState (boolean)
async function changeSoldState(request){
    const params = {
        TableName: listingsTable,
        Key: {
            uuid: request.listingID
        },
        UpdateExpression: 'SET soldState = :val', 
        ExpressionAttributeValues: {
            ':val': request.soldState, 
        },
    };
    await dynamodb.update(params).promise();
    
     const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Item updated successfully' }), 
    };
    
    return response;
}

// Takes in a username and listingID to delete listingID from selling and the actual listing
async function deleteListing(username, listingID){
    console.log(`Deleting listing for username: ${username}, listingID: ${listingID}`);
    const params = {
        TableName: listingsTable,
        Key: {
            uuid: listingID
        },
    };

    await dynamodb.delete(params).promise();
    
    const userTableParams = {
        TableName: userTable,
        Key: {
            username: username,
        },
    };
    
    const getResult = await dynamodb.get(userTableParams).promise();
    
    const updatedList = getResult.Item.selling.filter(
        item => item !== listingID
    );

    // Update the item with the modified list
    const updateParams = {
        TableName: userTable,
        Key: {
            username: username,
        },
        UpdateExpression: 'SET selling = :updatedList',
        ExpressionAttributeValues: {
            ':updatedList': updatedList,
        },
    };

    await dynamodb.update(updateParams).promise();
    
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
    
    // const response = {
    //     body: { message:  'Item deleted successfully' },
    // };
    
    // return util.buildResponse(200, response);
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Item deleted successfully' }), 
    };
    
    return response;
}



async function getUser(request){
    const params = {
        TableName: userTable,
        Key: {
            username: request.username
        },
    };

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There is an error getting user: ', error)
    })
    
}

async function getListings(listingsID){
    const fromS3 = await getImage(`${listingsID}/${listingsID}-1.jpeg`);

    const params = {
        TableName: listingsTable,
        Key: {
            uuid: listingsID
        },
    };

   const dynamoDBResponse = await dynamodb.get(params).promise();
   const dynamoDBItem = dynamoDBResponse.Item;
   const image = fromS3.toString('utf-8')
    
   const result = {
      dynamoDBItem,
      image
   };
   
   return result;
    
}

async function getImage(image){
    var params = { 
        Bucket: BUCKET_NAME, 
        Key: image,
        Expires: 3600
    };
    
    const url = s3.getSignedUrl('getObject', params)
    return url;
}
  



module.exports.getItem = getItem;
module.exports.deleteListing = deleteListing;
module.exports.changeSoldState = changeSoldState;
