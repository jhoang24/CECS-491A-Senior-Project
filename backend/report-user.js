const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

async function send_report_email(requestBody) {
  try {
    const {reason, subject } = requestBody;
    
    // Compose the email parameters
    const emailParams = {
      Destination: {
        ToAddresses: ['ale21100@gmail.com'], // personal email for testing
      },
      Message: {
        Body: {
          Text: {
            Data: reason,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: 'maximillian.gutierrez01@student.csulb.edu', // should be resellU's help email
    };

    // Send the email using Amazon SES
    const result = await ses.sendEmail(emailParams).promise();

    // Set CORS headers
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', result }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };

    return response;
  } catch (error) {
    // Handle errors and set CORS headers
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };

    return response;
  }
}

module.exports.send_report_email = send_report_email;
