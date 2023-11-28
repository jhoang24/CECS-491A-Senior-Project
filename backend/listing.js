// const AWS = require('aws-sdk');
// const dynamodb = new AWS.DynamoDB.DocumentClient();

// const listingsTable = '491_listings';

// async function get_listing(listing){
//     const uuid = listing.uuid;
    
//     const dynamoListing = await getListing(uuid);
    
//     const response = {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type":  "*"
//       },
//       body:  JSON.stringify({
//          // Commented out user for testing
//         listing: dynamoListing,
//             }),
//     };

//     return response;
// }


// async function getListing(uuid){
//     const params = {
//         TableName: listingsTable,
//         Key: {
//             uuid: uuid
//         }
//     }
//     return await dynamodb.get(params).promise().then(response => {
//         return response.Item;
//     }, error =>{
//         console.error('There is an error getting listing: ', error)
//     })
// }


// module.exports.get_listing = get_listing;



const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const uuid = event.queryStringParameters.uuid;

    const params = {
        TableName: '491_listings',
        Key: {
            'uuid': uuid
        }
    };

    try {
        const data = await dynamodb.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
            
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error retrieving data' })
        };
    }
};
