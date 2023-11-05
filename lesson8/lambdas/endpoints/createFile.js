const Responses = require('../common/API_Responses.js');
const S3 = require('../common/S3.js');

const bucket = process.env.bucketName

exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Response._400({message: 'missing fileName from path'});
    }

    let fileName = event.pathParameters.fileName;
    const data = JSON.parse(event.body);

    const newData = await S3.write(data, fileName, bucket)
        .catch(err => {
            console.log('error in S3 write', err);
            return null;
        })

    if (!newData) {
        return Responses._400({message: 'Failed to write data by filename'});
    }

    return Responses._200({ newData })

}