const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async write (data, tableName) {
        if (!data.ID) {
            throw Error('No ID on the data')
        }

        const params = {
            tableName,
            Item: data
        };

        const res = await documentClient
            .put(params)
            .promise();
        
        if (!res) {
            throw Error(`There was an error in inserting ID of ${data.ID}`);
        }
    },
    async get (ID, tableName) {
        if (!ID) {
            throw Error('No ID supplied');
        }

        const params = {
            tableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise();

        if (!data || !data.Item) {
            throw Error('There was an error fetching the data.');
        }

        return data.Item;
    },

    async query ({tableName, index, queryKey, queryValue}) {
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue
            }
        };
        console.log('params', params);
        const res = await documentClient.query(params).promise();

        return res.Items || [];
    }
}

module.exports = Dynamo;