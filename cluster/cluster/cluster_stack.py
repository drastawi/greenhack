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

        # Look up the default VPC
        vpc = ec2.Vpc.from_lookup(self, id="EKS-VPC", is_default=True)
        cluster_role = iam.Role.from_role_arn(self, 'cluster-role', 'arn:aws:iam::964313932742:role/ClusterStack-iam')
        # subnet1=vpc.select_subnets(availability_zones=["us-east-1c"]).subnet_ids
        # subnet2=vpc.select_subnets(availability_zones=["us-east-1d"]).subnet_ids
        # subnetid1 = ec2.Subnet.from_subnet_attributes(self, 'subnetid1', availability_zone='use1-az1', subnet_id=subnet1[0])
        # subnetid2 = ec2.Subnet.from_subnet_attributes(self, 'subnetid2', availability_zone='use1-az2', subnet_id=subnet2[0])
        subnet1=vpc.select_subnets(availability_zones=["us-west-1b"]).subnet_ids
        subnet2=vpc.select_subnets(availability_zones=["us-west-1c"]).subnet_ids
        subnetid1 = ec2.Subnet.from_subnet_attributes(self, 'subnetid1', availability_zone='usw1-az3', subnet_id=subnet1[0])
        subnetid2 = ec2.Subnet.from_subnet_attributes(self, 'subnetid2', availability_zone='usw1-az1', subnet_id=subnet2[0])
        vpc_subnets_selection = ec2.SubnetSelection(subnets=[subnetid1, subnetid2])
        # vpc_subnets_selection=ec2.SubnetSelection(subnets=subnets)
        # Creating Cluster with EKS
        eks_cluster = eks.Cluster(
            self, id=f"{construct_id}-cluster",
            cluster_name=f"{construct_id}-cluster",
            vpc=vpc,
            vpc_subnets=[vpc_subnets_selection],
            masters_role=cluster_role,
            default_capacity_instance=ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
            version=eks.KubernetesVersion.V1_23,
        )

        # Read the deployment config
        with open("../cdk8s/dist/cdk8s.k8s.yaml", 'r') as stream:
            deployment_yaml = yaml.load(stream, Loader=yaml.FullLoader)

        # Read the service config
        with open("../cdk8s/dist/cdk8s-service.k8s.yaml", 'r') as stream:
            service_yaml = yaml.load(stream, Loader=yaml.FullLoader)
        eks_cluster.add_manifest(f"{construct_id}-app-deployment", deployment_yaml)
        eks_cluster.add_manifest(f"{construct_id}-app-service", service_yaml)
