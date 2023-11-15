const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })

'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
const util = require('./utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const listingsTable = '491_listings';

// const { v4: uuidv4 } = require('uuid');

// // Generate a UUID
// const uuid = uuidv4();

async function createlisting(itemInfo){
    const uuid = itemInfo.uuid;
    const itemName = itemInfo.itemName;
    const itemDescription = itemInfo.itemDescription;
    const condition = itemInfo.condition;
    const catagory = itemInfo.catagory;
    const price = itemInfo.price;
    
    if (!itemName || !itemDescription || !condition|| !catagory || !price) {
        return util.buildResponse(401, {
            message: 'All item fields are required'
        });
    }
    
    const dynamoPrice = await getPrice(price);
    if (dynamoPrice < 0){
        return util.buildResponse(403, {message: 'item price cannot be negative'})
        
    }


    const item = {
        uuid: uuid,
        itemName: itemName,
        itemDescription: itemDescription,
        condition: condition,
        catagory: catagory,
        price: price
    };
    
    const params = {
        TableName: listingsTable,
        Item: item
    };
    
    const savedUserResponse = await saveItem(item);
    if(!savedUserResponse){
        return util.buildResponse(503, {message: 'Server error'});
    }
    const response = {
        item: itemInfo
    }
    return util.buildResponse(200, response);
}

async function getPrice(price){
    const params = {
        TableName: listingsTable,
        Key: {
            price: price
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There is an error getting item price: ', error);
    })
}

// async function getEmail(email) {
//     const params = {
//         TableName: userTable,
//         IndexName: 'email-index',
//         KeyConditionExpression: 'email = :email',
//         ExpressionAttributeValues: {
//             ':email': email
//         }
//     };

//     const response = await dynamodb.query(params).promise();
//     if (response.Items.length > 0) {
//         return response.Items[0]; // Email exists, return the user
//     } else {
//         return null; // Email doesn't exist
//     }
// }


async function saveItem(item){
    const params = {
        TableName: listingsTable,
        Item: item
    };
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error =>{
        console.error('There is an error saving user: ', error);
    });
}

module.exports.createListing = createlisting;
