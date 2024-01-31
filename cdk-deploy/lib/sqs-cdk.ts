import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_sqs as sqs } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';
import { aws_sns_subscriptions as snsSubscriptions } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_lambda_event_sources as lambdaEventSources } from 'aws-cdk-lib';

class SQSStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const sqsFunction = new lambda.Function(scope, `${id}-sqs-lambda`, {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("../aws_dist/"),
      handler: "lambda.handler",
      // functionName: 'MyLambdaFunction',
    })

    // Create an SNS Topic
    const snsTopic = new sns.Topic(scope, `${id}-sns-topic`);

    // Create an SQS Queue
    const sqsQueue = new sqs.Queue(scope, `${id}-sqs-queue`, {
      visibilityTimeout: cdk.Duration.seconds(300), // Change as needed
    });

    // Grant Lambda permissions to send messages to the SNS topic
    snsTopic.grantPublish(sqsFunction);

    sqsFunction.addEventSource(new lambdaEventSources.SqsEventSource(sqsQueue));

    // Subscribe SQS queue to the SNS topic
    snsTopic.addSubscription(new snsSubscriptions.SqsSubscription(sqsQueue));

    new cdk.CfnOutput(scope, 'SqsDemoUrl', {
      value: sqs.CfnQueue.name!,
    });
  }
}

export class SqsCdk extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new SQSStack(this,id,props);
  }
}
