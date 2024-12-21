// infra/bin/next-lambda-web-adapter-test.ts
import * as cdk from "aws-cdk-lib";
import { FileSystemStack } from "../lib/file-system-stack";
import { VpcLambdaStack } from "../lib/vpc-lambda-stack";
import { VpcSubnetStack } from "../lib/vpc-subnet-stack";

const app = new cdk.App();

const { vpc } = new VpcSubnetStack(app, "VpcSubnetStack");

const { accessPoint } = new FileSystemStack(app, "FileSystemStack", { vpc });

new VpcLambdaStack(app, "VpcLambdaStack", { vpc, accessPoint });
