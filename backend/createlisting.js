const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-east-1'
// })

'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
const util = require('./utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const listingsTable = '491_listings';


//new code
const BUCKET_NAME = 'resellu-product-listing-images';
const userTable = '491-users';
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

const profileFunctions = require('./profile');

async function createlisting(itemInfo){
    
    const uuid = itemInfo.uuid;
    const imagesLength = itemInfo.imagesLength;

    const itemName = itemInfo.itemName;
    const itemDescription = itemInfo.itemDescription;
    const condition = itemInfo.condition;
    const catagory = itemInfo.category;
    const price = itemInfo.price;
    const images = itemInfo.images;
    const userName = itemInfo.userName;
    const email = itemInfo.email;
    const soldState = false;


    if (!itemName || !itemDescription || !condition|| !catagory || !price) {
        return util.buildResponse(401, {
            message: 'All item fields are required'
        });
    }
    
    if (price < 0){
        return util.buildResponse(403, {message: 'item price cannot be negative'})
        
    }
    
    const lowerItemDescription = itemDescription.toLowerCase();
    const lowerItemName = itemName.toLowerCase();

    

    const item = {
        uuid: uuid,
        itemName: itemName,
        itemDescription: itemDescription,
        condition: condition,
        catagory: catagory,
        price: price,
        images: images,
        userName: userName,
        email: email,
        soldState: soldState,
        lowerItemName: lowerItemName,
        lowerItemDescription: lowerItemDescription,
        imagesLength: imagesLength,
        
    };
    
    const params = {
        TableName: listingsTable,
        Item: item
    };
    
    const savedUserResponse = await saveItem(item);
    if(!savedUserResponse){
        return util.buildResponse(503, {message: 'Server error'});
    }
    
    const dynamoUser = await addToSelling(userName, uuid);
    const response = {
        item: itemInfo
    }
    return util.buildResponse(200, response);
}

async function addToSelling(userName, uuid) {
    const getUserParams = {
        TableName: userTable,
        Key: {
            username: userName.username,
        },
    };

    const user = await dynamodb.get(getUserParams).promise();




    // Convert DynamoDB set to JavaScript array
    const sellingSet = new Set(user.Item.selling || []);
    sellingSet.add(uuid);

    const updateParams = {
        TableName: userTable,
        Key: {
            username: userName.username,
        },
        UpdateExpression: 'SET selling = :updatedList',
        ExpressionAttributeValues: {
            ':updatedList': Array.from(sellingSet), // Convert Set back to array
        },
    };

    await dynamodb.update(updateParams).promise();

    return user.Item;
}


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

async function uploadImages(images) {
   const responseArray = [];
   const uuid = images.uuid;

  for (let i = 0; i < images.images.length; i++) {
    const image = images.images[i];
    const decodedFile = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${uuid}/${uuid}-${i + 1}.jpeg`, // Adjust the naming convention here
      Body: decodedFile,
      ContentType: "image/jpeg",
    };

    
  const uploadResult = await s3.putObject(params).promise();
      responseArray.push({ success: true, message: `Image ${i + 1} uploaded successfully` });
    }

  const response = {
    body: responseArray,
  };

  return util.buildResponse(200, response);
}


// async function uploadImages(item) {
//   const images = item.images; // Assuming the files are passed as item property

//   const uploadPromises = images.map(async file => {
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: file.originalname,
//       Body: file.content, // Assuming the file content is passed in the item
//     };

//     try {
//       const data = await s3.upload(params).promise();
//       file.location = data.Location; // Assuming you want to store the S3 URL in the file object
//       return file;
//     } catch (err) {
//       throw err;
//     }
//   });

//   try {
//     const uploadedFiles = await Promise.all(uploadPromises);

//     // Handle associating the uploaded images with DynamoDB
//     const fileDetails = uploadedFiles.map(file => ({
//       filename: file.originalname,
//       location: file.location // Assuming the S3 URL is available as file.location
//       // Add more details here for DynamoDB association
//     }));

//     const params = {
//       TableName: listingsTable,
//       Item: { images: fileDetails }
//       // Add more attributes as needed to associate with the images
//     };

//     await docClient.put(params).promise();

//     return fileDetails; // Return uploaded file details
//   } catch (err) {
//     throw err;
//   }
// }




module.exports.uploadImages = uploadImages;
module.exports.createListing = createlisting;
