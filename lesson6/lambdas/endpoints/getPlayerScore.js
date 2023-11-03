const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'Missing ID from path'});
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(
        err => {
            console.log('Error in Dynamo Get', err);
            return null
        }
    )

    if (!user) {
        return Responses._400({message: 'Failed to get user ID'});
    }

    return Responses._200({user})
}