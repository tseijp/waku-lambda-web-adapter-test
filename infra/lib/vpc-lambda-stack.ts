// infra/lib/vpc-lambda-stack.ts
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as efs from "aws-cdk-lib/aws-efs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

interface Props {
  vpc: ec2.Vpc;
  accessPoint: efs.AccessPoint;
}

export class VpcLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { vpc, accessPoint } = props;

    new NodejsFunction(this, "VpcLambda", {
      filesystem: lambda.FileSystem.fromEfsAccessPoint(accessPoint, "/mnt/db"),
      entry: "handler.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      vpc,
      bundling: {
        nodeModules: ["sqlite3"],
      },
    });
  }
}
