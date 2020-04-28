import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')


def create(event, context):
    data = json.loads(event['body'])
    if 'title' not in data:
        logging.error('Validation Failed')
        return {'statusCode': 422,
                'body': json.dumps({'error_message': 'Couldn\'t create the todo item.'})}

    if not data['title']:
        logging.error('Validation Failed - text was empty. %s', data)
        return {'statusCode': 422,
                'body': json.dumps({'error_message': 'Couldn\'t create the todo item. As text was empty.'})}

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': str(uuid.uuid1()),
        'title': data['title'],
        'complete': False
    }

    # write the todo to the database
    table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
          'Access-Control-Allow-Origin': '*'
        },
        "body": json.dumps(item)
    }

    return response
