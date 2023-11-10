const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');
const WebSocket = require('../common/websocketMessage.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    
    try {
        const record = await Dynamo.get(connectionID, tableName);
        const { messages, domainName, stage } = record;

        messages.push(body.message);

        console.log(messages);
        const data = {...record, messages};

        console.log(data);
        await Dynamo.write(data, tableName);

        await WebSocket.send({domainName, stage, connectionID, message: "This is a reply to your message."});
        return Responses._200({message: 'got a message'});

    } catch (err) {
        return Responses._400({message: 'message could not be received'});
    }
    

    return Responses._200({message: 'got a message'});
};