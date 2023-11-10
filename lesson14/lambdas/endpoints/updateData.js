const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        Responses._400({message: 'No body found'});
    }

    const ID = event.pathParameters.ID;
    const { Player } = JSON.parse(event.body);

    const res = await Dynamo.update({
        tableName: tableName,
        primaryKey: 'ID',
        primaryKeyValue: ID,
        updateKey: 'Player',
        updateValue: Player,
    })

    return Responses._200({});
}