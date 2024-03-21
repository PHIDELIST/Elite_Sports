import json
import boto3

def handler(event, context):

    user_attributes = event['request']['userAttributes']
    email = user_attributes['email']
    user_id = event['userName']
    
   
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('EliteSportsBackendStack-EliteSportsReservationsC8306AFB-NQUZVN5X308P')
    table.put_item(Item={'userId': user_id, 'email': email})
    
    return {
        'statusCode': 200,
        'body': json.dumps('User email and user ID stored successfully')
    }
