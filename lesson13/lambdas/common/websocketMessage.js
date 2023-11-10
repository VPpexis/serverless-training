const AWS = require('aws-sdk');

const create = (domainName, stage) => {
    const endpoint = `${domainName}/${stage}`;
    console.log('endpoint', endpoint);
    return new AWS.ApiGatewayManagementApi({
        endpoint,
    });
};

const send = ({ domainName, stage, connectionID, message }) => {
    const ws = create(domainName, stage);

    const postParams = {
        Data: message,
        connectionID: connectionID,
    };
    console.log('postParams', postParams);
    console.log('ws', ws);
    return ws.postToConnection(postParams).promise();
};

module.exports = {
    send,
}