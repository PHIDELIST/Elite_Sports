import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Attr
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsBackendStack-EliteSportsReservationsC8306AFB-18XG56950EF4O')

def handler(event, context):
    user_id = event['pathParameters']['id']
    reservation_id = json.loads(event['body'])['id']  

    reservation = json.loads(event['body'])
    reservation['updatedAt'] = datetime.now().isoformat()
    response = table.update_item(
        Key={'userId': user_id},  
        UpdateExpression='SET #n = :val1, #l = :val2, #p = :val3, #d = :val4, #c = :val5, #s = :val6, #la = :val7, #u = :val8',
        ExpressionAttributeNames={'#n': 'name', '#l': 'location', '#p': 'price', '#d': 'description', '#c': 'category', '#s': 'size', '#la': 'lamp', '#u': 'updatedAt'},
        ExpressionAttributeValues={':val1': reservation['name'], ':val2': reservation['location'], ':val3': reservation['price'], ':val4': reservation['description'], ':val5': reservation['category'], ':val6': reservation['size'], ':val7': reservation['lamp'], ':val8': reservation['updatedAt']},
        # ConditionExpression=Attr('id').eq(reservation_id), 
        ReturnValues='UPDATED_NEW'
    )
    headers = {
        'Access-Control-Allow-Origin': '*',  
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps('Reservation updated successfully')
    }
