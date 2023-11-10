const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    await Dynamo.delete(connectionID, tableName);

    return Responses._200({message: 'disconnected'});
};