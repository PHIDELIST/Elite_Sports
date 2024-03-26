import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsBackendStack-EliteSportsReservationsC8306AFB-DCB2YB4NI3ZL')

def handler(event, context):
    if 'body' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing request body')
        }
    
    try:
        request_data = json.loads(event['body'])
        reservations = request_data.get('reservations', [])  
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid JSON format in request body')
        }

    for reservation in reservations:
        reservation['createdAt'] = datetime.now().isoformat()
        reservation['updatedAt'] = reservation['createdAt']
        
        try:
            response = table.put_item(Item=reservation)
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps(f'Error creating reservation: {str(e)}')
            }
    headers = {
        'Access-Control-Allow-Origin': '*',  
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }
    
    return {
        'statusCode': 200,
        'headers':headers,
        'body': json.dumps('Reservations created successfully')
    }
