# delete.py
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EliteSportsReservations')

def handler(event, context):
    reservation_id = event['pathParameters']['id']
    response = table.delete_item(
        Key={'reservationId': reservation_id}
    )
    return {
        'statusCode': 200,
        'body': json.dumps('Reservation deleted successfully')
    }