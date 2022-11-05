# greenhack

This is a project submitted to a GreenHack 2022. Please learn more about it from the [project description](https://taikai.network/gsf/hackathons/carbonhack22/projects/cl93xw83p12030101yrdbov5qgb/idea.
). 

There are three parts to this repo. 
* cdk to deploy kubernetes infra in two AWS regions.
* cdk8s to deploy a web application to the two clusters.
* green-dns a script that takes in time as an argument and updates DNS records in ConstelliX DNS to preferentially direct the web traffic to the greener data center.

## Deployment

set AWS config

```sh
npm install -g aws-cdk

cdk bootstrap aws://<account_id>/us-east-1
cdk bootstrap aws://<account_id>/us-west-1

cd cluseter
python3 -m venv .venv
pip3 install -r requirements.txt

cdk bootstrap 
cdk deploy

aws eks update-kubeconfig --name ClusterStack-cluster --region us-east-1 --role-arn arn:aws:iam::<account_id>:role/ClusterStack-iam
aws eks update-kubeconfig --name ClusterStack-cluster --region us-west-1 --role-arn arn:aws:iam::<account_id>:role/ClusterStack-iam
```
cdk8s
```shell
cd cdk8s
pip3 install pipenv
cdk8s init python-app
cdk8s synth
```

Deploy of k8s based on the tutorial
https://aws.amazon.com/getting-started/guides/deploy-webapp-eks/module-four/

## Deploy DNS

```shell
https://sonar.constellix.com/main#/httpform
```
