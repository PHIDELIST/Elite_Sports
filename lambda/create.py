import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsReservations')

def handler(event, context):
    reservation = json.loads(event['body'])
    reservation['createdAt'] = datetime.now().isoformat()
    reservation['updatedAt'] = reservation['createdAt']
    response = table.put_item(Item=reservation)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Reservation created successfully')
    }
