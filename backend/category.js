const AWS = require('aws-sdk');
const util = require('./utils');
const BUCKET_NAME = 'resellu-product-listing-images';
const s3 = new AWS.S3();

const dynamodb = new AWS.DynamoDB.DocumentClient();

const listingsTable = '491_listings';

async function get_category(item) {
    const category = item.category;
    try {
        const dynamoListings = await get_listing(category);
        
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
            body: { listings: listingsWithImage },
        };
        
        return util.buildResponse(200, response);
    } catch (error) {
        console.error('Error getting listings: ', error);
        
        return util.buildResponse(500, { error: 'Error retrieving listings' });
    }
}

async function get_listing(catagory) {
    const params = {
        TableName: listingsTable,
        Limit: 25,
        FilterExpression: 'attribute_exists(catagory) AND (#catagory = :catagory)',
        ExpressionAttributeNames: {
            '#catagory': 'catagory',
        },
        ExpressionAttributeValues: {
            ':catagory': catagory,
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
  

module.exports.get_category = get_category;
