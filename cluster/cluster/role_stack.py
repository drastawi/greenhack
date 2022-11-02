import yaml
from aws_cdk import (
    # Duration,
    Stack,
    Environment,
    aws_iam as iam,
    aws_eks as eks,
    aws_ec2 as ec2
)

from constructs import Construct

class ClusterStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create master role for EKS Cluster
        iam_role = iam.Role(self, id=f"{construct_id}-iam",
                            role_name=f"{construct_id}-iam", assumed_by=iam.AccountRootPrincipal())
