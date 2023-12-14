const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const BUCKET_NAME = 'resellu-product-listing-images';

const listingsTable = '491_listings';

async function get_listing(listing){
    const uuid = listing.uuid;
    const images = []
    
        const dynamoListing = await getListing(uuid);
        for (let i = 0; i < dynamoListing.imagesLength; i++) {
        const fromS3 = await getImage(`${uuid}/${uuid}-${i + 1}.jpeg`);
        const image = fromS3.toString('base64')
        images.push(image);
    }


    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":  "*"
      },
      body:  JSON.stringify({
         // Commented out user for testing
        listing: dynamoListing,
        image: images
            }),
    };

    return response;
}


async function getListing(uuid){
    const params = {
        TableName: listingsTable,
        Key: {
            uuid: uuid
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There is an error getting listing: ', error)
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


module.exports.get_listing = get_listing;



// const AWS = require('aws-sdk');
// const dynamodb = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//     const uuid = event.queryStringParameters.uuid;

//     const params = {
//         TableName: '491_listings',
//         Key: {
//             'uuid': uuid
//         }
//     };

//     try {
//         const data = await dynamodb.get(params).promise();
//         return {
//             statusCode: 200,
//             body: JSON.stringify(data.Item)
            
//         };
//     } catch (err) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Error retrieving data' })
//         };
//     }
// };
