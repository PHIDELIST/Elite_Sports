# update.py
import json

def handler(event, context):
   
    return {
        'statusCode': 200,
        'body': json.dumps('Delete operation')
    }
