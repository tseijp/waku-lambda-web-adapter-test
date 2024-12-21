// infra/lib/file-system-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as efs from "aws-cdk-lib/aws-efs";

interface Props {
  vpc: ec2.Vpc;
}

export class FileSystemStack extends cdk.Stack {
  public readonly accessPoint;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { vpc } = props;

    const fileSystem = new efs.FileSystem(this, "FileSystem", {
      vpc,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
      outOfInfrequentAccessPolicy:
        efs.OutOfInfrequentAccessPolicy.AFTER_1_ACCESS,
    });

    this.accessPoint = fileSystem.addAccessPoint("AccesssPoint", {
      path: "/export/lambda",
      createAcl: {
        ownerUid: "1001",
        ownerGid: "1001",
        permissions: "750",
      },
      posixUser: {
        uid: "1001",
        gid: "1001",
      },
    });
  }
}
