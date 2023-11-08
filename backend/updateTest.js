const bcrypt = require('bcryptjs');

async function mockUpdate(profile) {
    const email = profile.email;
    const password = profile.password;
    const passwordToken = profile.token;

    const dynamoUser = { // Simulated DynamoDB response
        username: "mockUsername",
        PasswordToken: [passwordToken, Date.now() + 1000, false], // Simulated PasswordToken
    };
    
    let encryptedPW;

    if (passwordToken && password) {
        if (dynamoUser.PasswordToken[0] == passwordToken && dynamoUser.PasswordToken[2] == false) {
            if (dynamoUser.PasswordToken[1] - Date.now() > 3600000) {
                return { statusCode: 500, body: { message: "The link has expired" } };
            }
            
            encryptedPW = bcrypt.hashSync(password.trim(), 10);
            const passwordMessage = await mockChangePassword(dynamoUser.username, encryptedPW);
            const cleared = await mockClearListAttribute(dynamoUser.username);
            const updatedToken = await mockUpdateToken(dynamoUser.username, dynamoUser.PasswordToken[0], true);
        } else {
            return { statusCode: 500, body: { message: "The link has already been used" } };
        }
    }
    
    return {
        statusCode: 200,
        body: { 
            message: "Password has been changed",
            encryptedPW: encryptedPW // Sending encrypted password in the response
        }
    };
}

async function mockChangePassword(username, password) {
    // Simulate DynamoDB update operation
    console.log(`Mock changePassword operation for user ${username} with password ${password}`);
}

async function mockClearListAttribute(username) {
    // Simulate DynamoDB update operation
    console.log(`Mock clearListAttribute operation for user ${username}`);
}

async function mockUpdateToken(username, token, used) {
    // Simulate DynamoDB update operation
    console.log(`Mock updateToken operation for user ${username} with token ${token} and used ${used}`);
}

// Example usage
const profile = {
    email: "example@example.com",
    password: "mockPassword123",
    token: "mockToken123"
};

mockUpdate(profile)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
