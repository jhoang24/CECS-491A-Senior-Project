function buildResponse(statusCode, body){
    return{
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "applicaiton/json"
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;