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
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName)
        .catch(error => {
            console.log('Error in dynamo write', error);
            return null;
        })

    if (!newUser) {
        return Responses._400({message: 'Failed to write user by ID'});
    }

    return Responses._200({newUser});
}