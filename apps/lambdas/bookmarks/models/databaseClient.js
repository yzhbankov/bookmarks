const AWS = require('aws-sdk');

export class DatabaseClient {
    #table = null;

    constructor(tableName) {
        this.#table = new AWS.DynamoDB.DocumentClient({
            params: { TableName: tableName }
        });
    }

    async save(params) {
        try {
            await this.#table.put({
                Item: params,
            }).promise();
        } catch (e) {
            console.error('[DatabaseClient] save: ', e);
        }
    }

    async read(pkValue) {
        try {
            return await this.#table.get({ Key: { PK: pkValue } }).promise();
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
