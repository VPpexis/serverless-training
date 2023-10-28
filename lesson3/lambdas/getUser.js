const Responses = require('./API_Responses')

exports.handler = async event => {
    console.log('event', event)

    if (!event.pathParameters || !event.pathParameters.ID) {
        // Failed without an ID
        return Responses._400({message: 'missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        // return the data
        return Responses._200(data[ID])
    }

    //failed as ID not in the data.
    return Responses._400({message: 'no ID in data'})
}

const data = {
    1234: { name: 'Van Philip Panugan', age: 25, job: 'student' },
    2345: { name: 'Ria Juvica Panugan', age: 23, job: 'marketing' },
    3456: { name: 'John Doe', age: 24, job: 'Developer' },
};