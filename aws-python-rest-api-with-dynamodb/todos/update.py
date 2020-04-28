import json
import time
import logging
import os

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def update(event, context):
    data = json.loads(event['body'])
    if 'complete' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't update the todo item.")
        return


    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # update the todo in the database
    result = table.update_item(
        Key={
            'id': event['pathParameters']['id']
        },
        ExpressionAttributeValues={
          ':complete': data['complete'],
        },
        UpdateExpression="SET complete = :complete",
        ReturnValues="UPDATED_NEW"
    )

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
          'Access-Control-Allow-Origin': '*'
        },
        "body": json.dumps(result['Attributes'],
                           cls=decimalencoder.DecimalEncoder)
    }

    return response
