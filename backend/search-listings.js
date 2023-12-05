const AWS = require('aws-sdk');
const util = require('./utils');
const BUCKET_NAME = 'resellu-product-listing-images';
const s3 = new AWS.S3();

const dynamodb = new AWS.DynamoDB.DocumentClient();

const listingsTable = '491_listings';

async function search_listing(item) {
    const listing = item.listing;

    try {
        const dynamoItems = await getListings(listing);
        
                
        // Attaches an image using get_Image() to the listings response
        const listingsWithImage = await Promise.all(
            dynamoItems.map(async (listing) => {
                const fromS3 = await getImage(`${listing.uuid}/${listing.uuid}-1.jpeg`);
                const image = fromS3.toString('utf-8');

                return {
                    ...listing,
                    image,
                };
            })
        );
        const response = {
            body: { listings: listingsWithImage }
        };
        return util.buildResponse(200, response);
    } catch (error) {
        console.error('Error:', error);
        return util.buildResponse(500, { error: 'Internal Server Error' });
    }
}

async function getListings(listing) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: listingsTable,
            FilterExpression: 'attribute_exists(lowerItemName) AND (contains(#lowerItemName, :searchTerm) OR contains(#lowerItemDescription, :searchTerm) OR contains(#catagory, :searchTerm)) AND soldState = :sold',
            ExpressionAttributeNames: {
                '#lowerItemName': 'lowerItemName',
                '#lowerItemDescription': 'lowerItemDescription',
                '#catagory': 'catagory'
            },
            ExpressionAttributeValues: {
                ':searchTerm': listing,
                ':sold': false,
            },
        };

        dynamodb.scan(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
                reject(err);
            } else {
                console.log('Scan succeeded:', data.Items);
                resolve(data.Items);
            }
        });
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
  

module.exports.search_listing = search_listing;
