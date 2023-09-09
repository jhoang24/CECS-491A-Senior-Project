const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })
const util = require('./utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const listingsTable = '491-listings';

async function createListing(itemInfo){
    const itemName = itemInfo.itemName
    const itemDescription = itemInfo.itemDescription
    const condition = itemInfo.condition
    const catagory = itemInfo.catagory
    const price = itemInfo.price
    
    // if (!username || !email || !password) {
    //     return util.buildResponse(401, {
    //         message: 'All fields are required'
    //     });
    // }
    
    
    // const dynamoUser = await getUser(username);
    // if (dynamoUser && dynamoUser.username){
    //     return util.buildResponse(403, {message: 'username already exists'})
        
    // }
    
    // const dynamoEmail = await getEmail(email);
    // if (dynamoEmail) {
    //     return util.buildResponse(403, { message: 'Email already exists' });
    // }
    
    // const encryptedPW = bcrypt.hashSync(password.trim(),10);

    const item = {
        itemName: itemName,
        itemDescription: itemDescription,
        condition: condition,
        catagory: catagory,
        price: price
    }
    
    const params = {
        TableName: listingsTable,
        Item: item
    }
    
    // try {
    // await dynamodb.put(params).promise();
    // return { body: 'Successfully created item!' }
    // } catch (err) {}
    
    const savedUserResponse = await saveItem(item);
    if(!savedUserResponse){
        return util.buildResponse(503, {message: 'Server error'});
    }
    const response = {
        item: itemInfo
    }
    return util.buildResponse(200, response);
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
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error =>{
        console.error('There is an error saving item: ', error);
    })
}

module.exports.createlisting = createlisting;
