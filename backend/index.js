const AWS = require('aws-sdk');

const loginService = require('./login');
const registerService = require('./register');
const verifyService = require('./verify');
const profileService = require('./profile')
const forgotPasswordService = require('./forgot-password')
const updatePasswordService = require('./update-password')
const confirmEmailService = require('./confirm-email')

const listingService = require('./listing')
const createListingService = require('./createlisting')

const util = require('./utils');


//api paths
const healthPath = '/health';

const loginPath = '/login';
const registerPath = '/register';
const verifyPath = '/verify';
const profilePath = '/profile';
const getProfilePath = '/get-profile';
const editProfilePath = '/edit-profile';
const forgotPasswordPath = '/forgot-password';
const updatePasswordPath = '/update-password';
const confirmEmailPath = '/confirm-email';

const createListing = '/createlisting';
const listingPath = '/listing';

exports.handler = async(event) => {
    console.log(event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = loginService.login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === editProfilePath:
            const profileBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = profileService.edit_profile(profileBody);
            break;
        case event.httpMethod === 'POST' && event.path === getProfilePath:
            const getProfileBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = profileService.get_profile(getProfileBody);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === createListing:
            const createListingBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = await createListingService.createListing(createListingBody);
            break;
        case event.httpMethod === 'POST' && event.path === forgotPasswordPath:
            const forgotPasswordBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = await forgotPasswordService.sendMail(forgotPasswordBody);
            break;
        case event.httpMethod === 'POST' && event.path === updatePasswordPath:
            const updatePasswordBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = await updatePasswordService.update(updatePasswordBody);
            break;
        case event.httpMethod === 'POST' && event.path === listingPath:
            const listingBody = JSON.parse(event.body);
             response = await listingService.get_listing(listingBody);
            //response = util.buildResponse(200);
            break;
            
            
        case event.httpMethod === 'GET' && event.path === listingPath:
            const paramValue = event.queryStringParameters.uuid;
            const dynamodb = new AWS.DynamoDB.DocumentClient();
            
    const params = {
        TableName: '491_listings',
        Key: {
            'uuid': paramValue
        }
    };

    try {
        const data = await dynamodb.get(params).promise();
        
        if (data.Item) {
            // Success response with CORS headers
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*', // You can specify your allowed origins here
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
                body: JSON.stringify(data.Item)
            };
        } else {
            // Not Found response with CORS headers
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*', // You can specify your allowed origins here
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
                body: JSON.stringify({ error: 'Item not found' })
            };
        }
    } catch (err) {
        // Error response with CORS headers
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // You can specify your allowed origins here
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            },
            body: JSON.stringify({ error: 'Error retrieving data' })
        };
    }
            
            
        case event.httpMethod === 'POST' && event.path === confirmEmailPath:
            const confirmEmail = JSON.parse(event.body);
             response = await confirmEmailService.verifyAccount(confirmEmail);
            break;
        default:
            response = util.buildResponse(404, '404 not found');
    }
    return response;
};

