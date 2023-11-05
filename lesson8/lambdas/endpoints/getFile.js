const Responses = require('../common/API_Responses.js');
const S3 = require('../common/S3.js');

const bucket = process.env.bucketName;

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Response._400({message: 'missing fileName from path'});
    }

    let fileName = event.pathParameters.fileName;
    
    const data = await S3.get(fileName, bucket)
        .catch(err => {
            console.log('error in S3 Get', err);
            return null;
        })

    if (!data) {
        return Responses._400({message: 'Failed to get data by filename'});
    }

    return Responses._200({ data })
}