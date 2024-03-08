import AWS from 'aws-sdk';

export class DatabaseClient {
    #table = null;

    constructor(tableName) {
        this.#table = new AWS.DynamoDB.DocumentClient({
            params: { TableName: tableName }
        });
    }

    async save({ pkValue, skValue, data }) {
        try {
            await this.#table.put({
                Item: { PK: pkValue, SK: skValue, data },
            }).promise();

            return data;
        } catch (e) {
            console.error('[DatabaseClient] save: ', e);
        }
    }

    async update({ pkValue, skValue, data }) {
        try {
            return this.#table.update({
                Key: {
                    PK: pkValue,
                    SK: skValue,
                },
                UpdateExpression: 'SET #dataAttr = :dataValue',
                ExpressionAttributeNames: {
                    '#dataAttr': 'data', // Use a placeholder for the reserved keyword
                },
                ExpressionAttributeValues: {
                    ':dataValue': data,
                },
                ReturnValues: 'ALL_NEW',
            }).promise();
        } catch (e) {
            console.error('[DatabaseClient] save: ', e);
        }
    }

    async readByPk(pkValue) {
        try {
            const result = await this.#table.query({
                KeyConditionExpression: 'PK = :pkValue',
                ExpressionAttributeValues: { ':pkValue': pkValue }
            }).promise();
            return result['Items'];
        } catch (e) {
            console.error('[DatabaseClient] read: ', e);
        }
    }

    async readByPkSk(pkValue, skValue) {
        try {
            return this.#table.get({ Key: { PK: pkValue, SK: skValue },}).promise();
        } catch (e) {
            console.error('[DatabaseClient] read: ', e);
        }
    }

    async remove(pkValue, skValue) {
        try {
            await this.#table.delete({ Key: { PK: pkValue, SK: skValue } }).promise();
        } catch (e) {
            console.error('[DatabaseClient] remove: ', e);
        }
    }
}
