function buildResponse(statusCode, body){
    return{
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*", 
            "Content-Type": "*"
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;