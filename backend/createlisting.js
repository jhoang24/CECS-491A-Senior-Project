const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = '491-listings';

async function createListing(itemInfo){
    const itemName = itemInfo.name;
    const itemPrice = itemInfo.price;
}

const params = {
    TableName: '491-listings',
    Item: {
      // Define your item attributes here
      // Example: 'attributeName': { dataType: attributeValue }
      'id': { S: '1' },
      'itemName': { S: 'Shoes' },
      'itemPrice': { N: '40' }
    }
  };
  
  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.error('Error inserting item:', err);
    } else {
      console.log('Item inserted successfully:', data);
    }
  });

// // Used in below code
// const item = {
//     itemName: itemName,
//     itemPrice: price,
// }

// const params = {
//     TableName: listings,
//     Item: item
// }

// try {
//     await dynamodb.put(params).promise();
//     return { body: 'Successfully created item!' }
//     } catch (err) {}

// const savedItemResponse = await saveItem(item);
// if(!savedItemResponse){
//     return util.buildResponse(503, {message: 'Server error'});
//     }


// async function saveItem(item){
//     const params = {
//         TableName: itemTable,
//         Item: item
//     }
//     return await dynamodb.put(params).promise().then(() => {
//         return true;
//     }, error =>{
//         console.error('There is an error creating listing: ', error);
//     })
// }