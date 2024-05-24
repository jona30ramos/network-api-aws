import type { AWS } from '@serverless/typescript'
import dotenv from 'dotenv'

dotenv.config()

const serverlessConfiguration: AWS = {
  app: 'api-form-due-diligence-pep',
  service: 'api-form-due-diligence-pep',
  org: process.env.ORG,
  frameworkVersion: '3',
  plugins: [
    'serverless-dotenv-plugin',
    'serverless-offline',
    'serverless-associate-waf',
    'serverless-domain-manager',
  ],
  custom: {
    associateWaf: {
      name: process.env.WAF_NAME,
      version: 'V2',
    },
    customDomain: {
      domainName: 'form-due-diligence-pep.api.chivowallet.com',
      createRoute53Record: true,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'ca-central-1',
    stackName: 'api-form-due-diligence-pep-production',
    timeout: 300,
    stage: 'production',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'cognito-idp:AdminInitiateAuth',
              'cognito-idp:AdminCreateUser',
              'cognito-idp:AdminSetUserPassword',
              'ec2:DescribeNetworkInterfaces',
              'ec2:CreateNetworkInterface',
              'ec2:DeleteNetworkInterface',
              'ec2:DescribeInstances',
              'ec2:AttachNetworkInterface',
              'rds-db:connect',
            ],
            Resource: '*',
          },
        ],
      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    api: {
      handler: './lib/src/index.handler',
      vpc: {
        securityGroupIds: ['sg-005620a4ccf2dc568'],
        subnetIds: ['subnet-0b0b267e79e235fd2', 'subnet-0b759cf6d22f011c6'],
      },
      events: [
        {
          http: {
            method: 'ANY',
            path: '/{proxy+}',
          },
        },
      ],
    },
  },
  package: { individually: true },
}

module.exports = serverlessConfiguration
