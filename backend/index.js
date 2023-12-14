const AWS = require('aws-sdk');

const loginService = require('./login');
const registerService = require('./register');
const verifyService = require('./verify');
const profileService = require('./profile')
const forgotPasswordService = require('./forgot-password')
const updatePasswordService = require('./update-password')
const confirmEmailService = require('./confirm-email')
const sendEmailService = require('./send-email')

const listingService = require('./listing')
const createListingService = require('./createlisting')
const sellingService = require('./selling')
const searchListingService = require('./search-listings')
const homeService = require('./home')
const categoryService = require('./category');
const favoritesService = require('./favorites');
const reportUserService = require('./report-user');
const deleteAccountService = require('./delete-account');


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
const emailConfSendPath = '/send-conf-email';

const createListing = '/createlisting';
const searchListingPath = '/listing-search';
const listingPath = '/listing';
const sendEmailPath = '/send-email';
const uploadImagesPath = '/upload-images';
const sellingPath = '/selling';
const homePath = '/home';
const categoryPath = '/category';
const favoritesPath = '/favorites';
const addFavoritePath = '/add-favorite';
const reportUserPath = '/report-user';
const deleteAccountPath = '/delete-account';




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
        case event.httpMethod === 'POST' && event.path === emailConfSendPath:
            const emailConfSendBody = JSON.parse(event.body);
            response = await registerService.sendEmail(emailConfSendBody);
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
        case event.httpMethod === 'POST' && event.path === sendEmailPath:
            const requestBody = JSON.parse(event.body);
            response = await sendEmailService.send_email(requestBody);
            break;
        case event.httpMethod === 'POST' && event.path === confirmEmailPath:
            const confirmEmail = JSON.parse(event.body);
             response = await confirmEmailService.verifyAccount(confirmEmail);
            break;
        case event.httpMethod === 'POST' && event.path === uploadImagesPath:
            const uploadImagesBody = JSON.parse(event.body);
             response = await createListingService.uploadImages(uploadImagesBody);
            break
        case event.httpMethod === 'POST' && event.path === sellingPath:
            const sellingBody = JSON.parse(event.body);
            
            if (sellingBody.hasOwnProperty('listingID') && sellingBody.hasOwnProperty('soldState')) {
                response = await sellingService.changeSoldState(sellingBody);
            } else {
                response = await sellingService.getItem(sellingBody);
            }
            break;
        case event.httpMethod === 'DELETE' && event.path === sellingPath:
            const username = event.queryStringParameters && event.queryStringParameters.username;
            const listingID = event.queryStringParameters && event.queryStringParameters.listingID;
            response = await sellingService.deleteListing(username, listingID);
            break;
            
        case event.httpMethod === 'DELETE' && event.path === deleteAccountPath:
            const deleteUser = event.queryStringParameters && event.queryStringParameters.username;
            response = await deleteAccountService.deleteAccount(deleteUser)
            break
            
        case event.httpMethod === 'POST' && event.path === deleteAccountPath:
            const deleteAccountBody = JSON.parse(event.body);
             response = await deleteAccountService.checkPasswordMatch(deleteAccountBody);
            break
            
        case event.httpMethod === 'POST' && event.path === searchListingPath:
            const searchBody = JSON.parse(event.body);
            // response = util.buildResponse(200);
             response = await searchListingService.search_listing(searchBody);
            break
        case event.httpMethod === 'GET' && event.path === homePath:
            // response = util.buildResponse(200);
             response = await homeService.get_listing();
            break
        case event.httpMethod == 'POST' && event.path == addFavoritePath:
            const favoritesBody = JSON.parse(event.body);
             response = await favoritesService.addFavorite(favoritesBody);//modified
            break
        case event.httpMethod === 'POST' && event.path === categoryPath:
            const categoryBody = JSON.parse(event.body);

            // response = util.buildResponse(200);
             response = await categoryService.get_category(categoryBody);
            break
            
        case event.httpMethod === 'POST' && event.path === profilePath:
            const usernameBody = JSON.parse(event.body);
            response = await profileService.getEmailForProfile(usernameBody);
            break;
            
        case event.httpMethod === 'POST' && event.path === reportUserPath:
            const reportBody = JSON.parse(event.body);
            response = await reportUserService.send_report_email(reportBody);
            break;
        default:
            response = util.buildResponse(404, '404 not found');
    }
    return response;
};

