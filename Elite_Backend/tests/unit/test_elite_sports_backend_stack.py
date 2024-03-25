import aws_cdk as core
import aws_cdk.assertions as assertions

from elite_sports_backend.elite_sports_backend_stack import EliteSportsBackendStack

# example tests. To run these tests, uncomment this file along with the example
# resource in elite_sports_backend/elite_sports_backend_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = EliteSportsBackendStack(app, "elite-sports-backend")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
