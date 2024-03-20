from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
    aws_dynamodb as dynamodb,
    aws_apigateway as apigw,
    aws_cognito as cognito,
    core
)
from constructs import Construct

class EliteSportsBackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Table
        table = dynamodb.Table(self, "EliteSportsItems",
                               partition_key=dynamodb.Attribute(name="itemId", type=dynamodb.AttributeType.STRING),
                               removal_policy=core.RemovalPolicy.DESTROY)

        # Lambda Functions
        create_lambda = _lambda.Function(self, "CreateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="create.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        read_lambda = _lambda.Function(self, "ReadFunction",
                                       runtime=_lambda.Runtime.PYTHON_3_8,
                                       handler="read.handler",
                                       code=_lambda.Code.from_asset("lambda"))

        update_lambda = _lambda.Function(self, "UpdateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="update.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        delete_lambda = _lambda.Function(self, "DeleteFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="delete.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        # API Gateway
        api = apigw.RestApi(self, "EliteSportsItemsApi")

        items = api.root.add_resource("items")
        create_integration = apigw.LambdaIntegration(create_lambda)
        items.add_method("POST", create_integration)

        single_item = items.add_resource("{id}")
        read_integration = apigw.LambdaIntegration(read_lambda)
        single_item.add_method("GET", read_integration)

        update_integration = apigw.LambdaIntegration(update_lambda)
        single_item.add_method("PUT", update_integration)

        delete_integration = apigw.LambdaIntegration(delete_lambda)
        single_item.add_method("DELETE", delete_integration)

        # Cognito User Pool
        user_pool = cognito.UserPool(self, "EliteSportsUserPool",
                                     self_sign_up_enabled=True,
                                     user_verification=cognito.UserVerificationConfig(email_subject="Verify your email"))

        # Output the API Gateway endpoint
        core.CfnOutput(self, "EliteSportsApiURL", value=api.url)
