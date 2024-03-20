from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
    aws_dynamodb as dynamodb,
    aws_apigateway as apigw,
    aws_cognito as cognito,
    aws_apigatewayv2 as apigwv2,
    aws_apigatewayv2_integrations as integrations,
    CfnOutput,
    RemovalPolicy
)
from constructs import Construct

class EliteSportsBackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Table
        table = dynamodb.Table(self, "EliteSportsItems",
                               partition_key=dynamodb.Attribute(name="Id", type=dynamodb.AttributeType.STRING),
                               removal_policy=RemovalPolicy.DESTROY)

        # Lambda Functions
        create_lambda = _lambda.Function(self, "CreateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="lambda.create.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        read_lambda = _lambda.Function(self, "ReadFunction",
                                       runtime=_lambda.Runtime.PYTHON_3_8,
                                       handler="lambda.read.handler",
                                       code=_lambda.Code.from_asset("lambda"))

        update_lambda = _lambda.Function(self, "UpdateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="lambda.update.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        delete_lambda = _lambda.Function(self, "DeleteFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="lambda.delete.handler",
                                         code=_lambda.Code.from_asset("lambda"))

        # API Gateway
        api = apigw.RestApi(self, "EliteSportsItemsApi",
                            default_cors_preflight_options={
                                "allow_origins": apigw.Cors.ALL_ORIGINS,
                                "allow_methods": apigw.Cors.ALL_METHODS
                            })

        items_resource = api.root.add_resource("items")
        single_item_resource = items_resource.add_resource("{id}")

        # Cognito User Pool
        user_pool = cognito.UserPool(self, "EliteSportsUserPool",
                                     self_sign_up_enabled=True,
                                     user_verification=cognito.UserVerificationConfig(email_subject="Verify your email"))

        # API Gateway Authorizer
        authorizer = apigw.CognitoUserPoolsAuthorizer(self, "EliteSportsAuthorizer",
                                                      cognito_user_pools=[user_pool])

        # Integration for Lambda Functions
        create_integration = apigw.LambdaIntegration(create_lambda)
        read_integration = apigw.LambdaIntegration(read_lambda)
        update_integration = apigw.LambdaIntegration(update_lambda)
        delete_integration = apigw.LambdaIntegration(delete_lambda)

        # Add Methods with Authorizer
        items_resource.add_method("POST", create_integration, authorizer=authorizer)
        single_item_resource.add_method("GET", read_integration, authorizer=authorizer)
        single_item_resource.add_method("PUT", update_integration, authorizer=authorizer)
        single_item_resource.add_method("DELETE", delete_integration, authorizer=authorizer)

        # Output the API Gateway endpoint
        CfnOutput(self, "EliteSportsApiURL", value=api.url)
