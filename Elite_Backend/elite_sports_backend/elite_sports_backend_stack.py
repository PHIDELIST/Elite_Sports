from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
    aws_dynamodb as dynamodb,
    aws_apigateway as apigw,
    aws_cognito as cognito,
    aws_apigatewayv2 as apigwv2,
    aws_apigatewayv2_integrations as integrations,
    CfnOutput,
    RemovalPolicy,
    aws_iam as iam,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
)
from constructs import Construct


class EliteSportsBackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Table
        table = dynamodb.Table(self, "EliteSportsReservations",
            partition_key=dynamodb.Attribute(name="userId", type=dynamodb.AttributeType.STRING),
            removal_policy=RemovalPolicy.DESTROY)
        
        # Global Secondary Index to facilitate querying by userId
        table.add_global_secondary_index(
            index_name="UserIdIndex",
            partition_key=dynamodb.Attribute(name="userId", type=dynamodb.AttributeType.STRING)
        )

        # Lambda Functions
        create_lambda = _lambda.Function(self, "CreateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="create.handler",
                                         code=_lambda.Code.from_asset("lambda/create"))

        read_lambda = _lambda.Function(self, "ReadFunction",
                                       runtime=_lambda.Runtime.PYTHON_3_8,
                                       handler="read.handler",
                                       code=_lambda.Code.from_asset("lambda/read"))

        update_lambda = _lambda.Function(self, "UpdateFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="update.handler",
                                         code=_lambda.Code.from_asset("lambda/update"))

        delete_lambda = _lambda.Function(self, "DeleteFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler="delete.handler",
                                         code=_lambda.Code.from_asset("lambda/delete"))
        
        post_confirmation_lambda = _lambda.Function(self, "PostConfirmationLambda",
                                              runtime=_lambda.Runtime.PYTHON_3_8,
                                              handler="post_confirmation_lambda.handler",
                                              code=_lambda.Code.from_asset("lambda/post_signup"))


        # IAM policy statement for DynamoDB access
        dynamodb_policy_statement = iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=[
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Scan" 
            ],
            resources=["*"]  
        )

        # IAM policy to each Lambda function
        create_lambda.role.add_to_policy(dynamodb_policy_statement)
        read_lambda.role.add_to_policy(dynamodb_policy_statement)
        update_lambda.role.add_to_policy(dynamodb_policy_statement)
        delete_lambda.role.add_to_policy(dynamodb_policy_statement)
        post_confirmation_lambda.add_to_role_policy(dynamodb_policy_statement)

        # API Gateway
        api = apigw.RestApi(
            self, "EliteSportsItemsApi",
            default_cors_preflight_options={
                "allow_origins": ["*"],
                "allow_methods": apigw.Cors.ALL_METHODS,
                "allow_headers": ["*"] 
            }
        )


        items_resource = api.root.add_resource("items")
        single_item_resource = items_resource.add_resource("{id}")
        

        # Cognito User Pool
        user_pool = cognito.UserPool(self, "EliteSportsUserPool",
                                     self_sign_up_enabled=True,
                                     user_verification=cognito.UserVerificationConfig(email_subject="Verify your email"),
                                     sign_in_aliases=cognito.SignInAliases(email=True),
                                     removal_policy=RemovalPolicy.DESTROY)
        
        user_pool_client = cognito.UserPoolClient(self, "EliteSportsUserPoolClient",
                                                   user_pool=user_pool,
                                                   auth_flows={
                                                       "user_password": True,
                                                       "user_srp": True
                                                   })

        # post confirmation trigger
        user_pool.add_trigger(
            operation=cognito.UserPoolOperation.POST_CONFIRMATION,
            fn= post_confirmation_lambda
        )

        # Cognito API Gateway Authorizer
        authorizer = apigw.CognitoUserPoolsAuthorizer(self, "EliteSportsAuthorizer",
                                                      cognito_user_pools=[user_pool],
                                                      )

        # Integration for Lambda Functions
        create_integration = apigw.LambdaIntegration(create_lambda)
        read_integration = apigw.LambdaIntegration(read_lambda)
        update_integration = apigw.LambdaIntegration(update_lambda)
        delete_integration = apigw.LambdaIntegration(delete_lambda)

        #Adding methods to apigw for lambda functions
        items_resource.add_method("POST", create_integration,api_key_required=False,authorizer=authorizer)
        items_resource.add_method("GET", read_integration,api_key_required=False,authorizer=authorizer)
        single_item_resource.add_method("PUT", update_integration,api_key_required=False,authorizer=authorizer)
        single_item_resource.add_method("DELETE", delete_integration,api_key_required=False,authorizer=authorizer)
         
        # S3 Bucket for Website Hosting
        frontend_bucket = s3.Bucket(self, "EliteSportsWebsiteBucket254",
                                   website_index_document="index.html",
                                   removal_policy=RemovalPolicy.DESTROY)
        
        # S3 Bucket for Website Assets
        assets_bucket = s3.Bucket(self, "EliteSportsAssetsBucket",
                                  removal_policy=RemovalPolicy.DESTROY)
        
        # Allow CloudFront to access the S3 bucket
        frontend_bucket.add_to_resource_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=["s3:GetObject"],
            resources=[frontend_bucket.arn_for_objects("*")],
            principals=[iam.ServicePrincipal("cloudfront.amazonaws.com")],
        ))

        # Allow CloudFront to access the assets S3 bucket
        assets_bucket.add_to_resource_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=["s3:GetObject"],
            resources=[assets_bucket.arn_for_objects("*")],
            principals=[iam.ServicePrincipal("cloudfront.amazonaws.com")],
        ))

        # Website CloudFront Distribution
        cloudfront_distribution = cloudfront.CloudFrontWebDistribution(self, "WebsiteDistribution",
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=frontend_bucket,
                        origin_access_identity=cloudfront.OriginAccessIdentity(self, 'OAI')
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            is_default_behavior=True,
                            allowed_methods=cloudfront.CloudFrontAllowedMethods.GET_HEAD
                        )
                    ]
                )
            ],
            error_configurations=[
                cloudfront.CfnDistribution.CustomErrorResponseProperty(
                    error_code=403,
                    response_code=200,
                    response_page_path="/index.html"
                )
            ]
        )

        # Assets CloudFront Distribution
        photos_distribution = cloudfront.CloudFrontWebDistribution(self, "PhotosDistribution",
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=assets_bucket,
                        origin_access_identity=cloudfront.OriginAccessIdentity(self, 'OAIPhotos')
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            is_default_behavior=True,
                            allowed_methods=cloudfront.CloudFrontAllowedMethods.GET_HEAD,
                            cached_methods=cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD,
                        )
                    ]
                )
            ],
            default_root_object="/" 
        )

         # Outputs
        CfnOutput(self, "WebsiteURL", value=cloudfront_distribution.distribution_domain_name)
        CfnOutput(self, "EliteSportsApiURL", value=api.url)
        CfnOutput(self, "UserPoolId", value=user_pool.user_pool_id)
        CfnOutput(self, "UserPoolClientId", value=user_pool_client.user_pool_client_id)

