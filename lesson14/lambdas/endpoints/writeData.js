const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');

tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        Responses._400({message: 'No body found'});
    }

    const ID = event.pathParameters.ID;
    const data = JSON.parse(event.body);
    data.ID = ID;

    const newData = await Dynamo.write(data, tableName)
        .catch((err) => {
            console.log('error: ', err);
        })
    
    if (!newData) {
        return Responses._400({message: 'Error in writing'});
    }

    return Responses._200({newData});


}