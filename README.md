# greenhack

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
