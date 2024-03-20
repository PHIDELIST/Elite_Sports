import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsReservations')

def handler(event, context):
    reservation_id = event['pathParameters']['id']
    reservation = json.loads(event['body'])
    reservation['updatedAt'] = datetime.now().isoformat()
    response = table.update_item(
        Key={'reservationId': reservation_id},
        UpdateExpression='SET #f = :val1, #s = :val2, #e = :val3, #st = :val4, #u = :val5',
        ExpressionAttributeNames={'#f': 'fieldName', '#s': 'startTime', '#e': 'endTime', '#st': 'status', '#u': 'updatedAt'},
        ExpressionAttributeValues={':val1': reservation['fieldName'], ':val2': reservation['startTime'], ':val3': reservation['endTime'], ':val4': reservation['status'], ':val5': reservation['updatedAt']},
        ReturnValues='UPDATED_NEW'
    )
    return {
        'statusCode': 200,
        'body': json.dumps('Reservation updated successfully')
    }
