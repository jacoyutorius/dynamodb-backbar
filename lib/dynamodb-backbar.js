'use strict';
const Aws = require('aws-sdk');

module.exports = class BackBar {
  constructor(region, endpoint) {
    const settings = [];
    if (region) {
      settings.region = region;
    }
    if (endpoint) {
      settings.endpoint = endpoint;
    }

    if (settings) {
      this.dynamodbClient = new Aws.DynamoDB.DocumentClient(settings);
    } else {
      this.dynamodbClient = new Aws.DynamoDB.DocumentClient();
    }
  }

  queryByName(name) {
    const params = {
      TableName: 'Backbar',
      KeyConditionExpression: '#NAME = :name',
      ExpressionAttributeNames: {
        "#NAME": 'name'
      },
      ExpressionAttributeValues: {
        ':name': name
      }
    };

    return this.dynamodbClient.query(params).promise();
  }

  scanByKeyword(keyword) {
    const params = {
      TableName: 'Backbar',
      FilterExpression: 'contains(#KEYWORDS, :keywords)',
      ExpressionAttributeNames: {
        '#KEYWORDS': 'keywords'
      },
      ExpressionAttributeValues: {
        ':keywords': keyword
      }
    };

    return this.dynamodbClient.scan(params).promise();
  }
}