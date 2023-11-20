//const Response = require('../common/API_Responses.js');
//const S3 = require('../common/S3.js');
//const uuid = require('uuid');
//import * as fileType from 'file-type';
//const { fileType } = require('file-type');
import * as fileType from 'file-type';
import Response from '../common/API_Responses.js';
import S3 from '../common/S3.js';
import uuid from uuid;

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
const bucket = process.env.imageUploadBucket;
const region = proccess.env.region;

exports.handler = async event => {
    try {
        const body = JSON.parse(event.body);

        if (!body || !body.image || !body.mime) {
            return Response._400({message: "No body or image found."});
        }

        if (!allowedMimes.includes(body.mime)) {
            return Response._400({message: "mime is not allowed."});
        }

        let imageData = body.image;
        if (body.image.substr(0,7) === 'base64,') {
            imageData = body.image.substr(7, body.image.length)
        } 

        const buffer = Buffer.from(imageData, 'base64');
        const fileInfo = await fileType.fromBuffer(buffer);
        const detectedExt = fileInfo.ext;
        const detectedMime = fileInfo.mime;

        if (detectedMime !== body.mime) {
            return Response._400({message: "mime types dont match"});
        }
        
        const name = uuid.v4();
        const key = `${name}.${detectedExt}`

        console.log(`writing image to s3 bucket called ${key}`);

        await s3.put({
            buffer: buffer,
            key: key,
            contettype: body.mime,
            bucket: bucket
        });

        const url = `https://${bucket}.s3-${region}.amazonaws.com/${key}`;

        return Responses._200({
            imageURL: url
        });

    } catch (err) {
        console.log('error', err);

        return Responses._400({message: err.message || 'failed to upload image'});
    }
}