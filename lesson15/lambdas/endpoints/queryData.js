const Responses = require('../common/API_Responses.js');
const Dynamo = require('../common/Dynamo.js');

const tableName = process.env.tableName;

exports.handler = async event => {
    if (!event.pathParameters.game) {
        return Responses._400({message: 'missing game from path'});
    }

    const game = event.pathParameters.game;

    const gamePlayers = await Dynamo.query({
        tableName,
        index: 'game-index',
        queryKey: 'game',
        queryValue: game
    });

    return Responses._200({gamePlayers});
}