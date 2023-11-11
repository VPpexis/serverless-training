const Responses = require('../common/API_Responses.js')
const Dynamo = require('../common/Dynamo.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event)

    if (!event.pathParameters || event.pathParameters.ID) {
        Responses._400({message: "No ID found"});
    }

    const ID = event.pathParameters.ID;

    const data = await Dynamo.get(ID, tableName)
        .catch((err) => {
            console.log('error: ', err);
        })

    if (!data) {
        return Responses._400({message: 'No data found'})
    }

    return Responses._200({data})
}