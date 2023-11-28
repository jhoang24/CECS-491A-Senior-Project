function buildResponse(statusCode, body){
    return{
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            // 'Content-Type': 'image/jpeg'
            "Content-Type": "*"
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;