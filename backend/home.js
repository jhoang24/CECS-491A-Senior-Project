const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET_NAME = 'resellu-product-listing-images';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const util = require('./utils');

const listingsTable = '491_listings';

async function get_listing() {
    try {
        const dynamoListings = await get_home();
        
        
        // Attaches an image using get_Image() to the listings response
        const listingsWithImage = await Promise.all(
            dynamoListings.map(async (listing) => {
                const fromS3 = await getImage(`${listing.uuid}/${listing.uuid}-1.jpeg`);
                const image = fromS3.toString('utf-8');

                return {
                    ...listing,
                    image,
                };
            })
        );
        const response = {
            body: { listings: listingsWithImage},
        };
        
        return util.buildResponse(200, response);
    } catch (error) {
        console.error('Error getting listings: ', error);
        
        return util.buildResponse(500, { error: 'Error retrieving listings' });
    }
}

async function get_home() {
    const params = {
        TableName: listingsTable,
        Limit: 25,
        ScanIndexForward: false,
        FilterExpression: 'soldState = :sold',
        ExpressionAttributeValues: {
            ':sold': false,
        },
    };
    

    return await dynamodb.scan(params).promise().then(response => {
        return response.Items;
    }, error => {
        console.error('There is an error getting listings: ', error);
        throw error; 
    });
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
  


module.exports.get_listing = get_listing;
