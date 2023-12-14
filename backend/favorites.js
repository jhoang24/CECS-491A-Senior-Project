const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })

'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
const util = require('./utils');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = '491-users';
const listingsTable = '491_listings';
const docClient = new AWS.DynamoDB.DocumentClient();
const BUCKET_NAME = 'resellu-product-listing-images';
const s3 = new AWS.S3();


/*
async function addFavorites(username, listing){
    const params = {
        TableName: userTable,
        Key: {
            username: username,
        },
        UpdateExpression: 'SET favorite = list_append(if_not_exists(favorites, :empty_list) :listing)',
        ExpressionAttributeValues: {
            ':empty_list': [],
            ':listing': [listing],
        }
    }
}
*/

async function addFavorite(username, uuid) {
    try{
        const params = {
            TableName: userTable,
            Key: {
                username: username,
            },
            UpdateExpression: 'SET favorite = list_append(if_not_exists(favorite, :empty_list), :listing)',
            ExpressionAttributeValues: {
                ':empty_list': [],
                ':listing': [uuid],
            },
        };
        
        const result = await dynamodb.update(params).promise();
        
        if (result.Attributes) {
            const response = {
                message: 'Information favorite changed',
                favorite: result.Attributes.favorite,
            };
            return util.buildResponse(200, response);
        } 
        else {
            return util.buildResponse(404, { message: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error adding favorite:', error);
        console.error('Error stack trace:', error.stack);

        return util.buildResponse(500, { message: 'Internal server error' });
    }
}


        /*
        const getUserParams = {
            TableName: userTable,
            Key: {
                username: userName.username,
            },
        };
    
        const user = await dynamodb.get(getUserParams).promise();
    
    
    
        
        // Convert DynamoDB set to JavaScript array
        const favoriteSet = new Set(user.Item.favorite || []);
        favoriteSet.add(uuid);
    
        const updateParams = {
            TableName: userTable,
            Key: {
                username: userName.username,
            },
            UpdateExpression: 'SET favorite = :updatedList',
            ExpressionAttributeValues: {
                ':updatedList': Array.from(favoriteSet), // Convert Set back to array
            },
        };
    
        await dynamodb.put(updateParams).promise();
        const response = {
            body: { message: "Information favorite Changed"},
            
        };
        return util.buildResponse(200, response);
        */


    /*
    try {
        const result = await dynamodb.update(params).promise();
        return {success: true, user: result.Attributes};
    } catch(error){
        console.error('Erroring adding favorite: ', error);
        return {sucess: false, error: 'Error adding favorite'};
    }
    */
/*
async function getFavorites(request){
    const user = await getUser(request)
    
    const listingsArray = await Promise.all(user.favorite.map(element => getListings(element)));

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
*/

module.exports.addFavorite = addFavorite;