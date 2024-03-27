import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsBackendStack-EliteSportsReservationsC8306AFB-18XG56950EF4O')

def handler(event, context):
    reservation_id = event['pathParameters']['id']
    response = table.delete_item(
        Key={'reservationId': reservation_id}
    )
    headers = {
        'Access-Control-Allow-Origin': '*',  
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }
    
    return {
        'statusCode': 200,
        'headers':headers,
        'body': json.dumps('Reservation deleted successfully')
    }
