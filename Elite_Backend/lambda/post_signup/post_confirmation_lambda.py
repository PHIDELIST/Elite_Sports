import json
import boto3

def handler(event, context):
    try:
        user_attributes = event['request']['userAttributes']
        email = user_attributes['email']
        user_id = event['userName']

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('EliteSportsBackendStack-EliteSportsReservationsC8306AFB-18XG56950EF4O')
        table.put_item(Item={'userId': user_id, 'email': email})

        return event
    except Exception as e:
        print(f"Error: {str(e)}")

        return {
            'statusCode': 500,
            'body': json.dumps('An error occurred while processing the request')
        }
