const AWS = require('aws-sdk');

const registerService = require('./register');
const loginService = require('./login');
const createListingService = require('./createlisting')
const profileService = require('./profile')
const verifyService = require('./verify');
const util = require('./utils');

const registerPath = '/register';
const healthPath = '/health';
const loginPath = '/login';
const profilePath = '/profile';
const verifyPath = '/verify';
const createListing = '/createlisting';
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
        case event.httpMethod === 'POST' && event.path === profilePath:
            const profileBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = profileService.edit_profile(profileBody);
            break;
        case event.httpMethod === 'GET' && event.path === profilePath:
            const getProfileBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
            response = profileService.get_profile();
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
        default:
            response = util.buildResponse(404, '404 not fouind');
    }
    return response;
};

