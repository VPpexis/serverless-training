const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async delete(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        } 
        
        return documentClient.delete(params).promise();
    },
    async  get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise();
        
        console.log("data", data);
        
        if (!data || !data.Item) {
            throw Error('There was an error fetching the data.')
        }
        console.log(data);
        
        return data.Item;
    },

    async write (data, TableName) {
        if (!data.ID) {
            throw Error("no ID on the data")
        }

        const params = {
            TableName,
            Item: data
        }

        console.log('Params', params);
        const res = await documentClient
            .put(params)
            .promise()

        if (!res) {
            throw Error(`There was an error in inserting ID of ${data.ID} into table ${data.TableName}`)
        }

        return data;
    }
}

module.exports = Dynamo;