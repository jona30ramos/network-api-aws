import type { AWS } from '@serverless/typescript'
import dotenv from 'dotenv'

dotenv.config()

const serverlessConfiguration: AWS = {
  app: 'api-form-save-due-diligence-pep',
  service: 'api-form-save-due-diligence-pep',
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
      domainName: 'kyc-dev.api.chivowallet.com',
      createRoute53Record: true,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'ca-central-1',
    timeout: 900,
    stage: 'dev',
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
              's3:GetObject', // Permiso para leer objetos de S3
              's3:ListBucket', // Permiso para listar objetos en el bucket de S3
              's3:PutObject',
              's3:PutObjectAcl',
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
        securityGroupIds: ['sg-0eb50b7f9e4595c5e'],
        subnetIds: ['subnet-0fe2a770b2fd708d1'],
      },
      events: [
        {
          http: {
            method: 'ANY',
            path: '/{proxy+}',
            cors: {
              origins: [
                'https://kyc-dev.chivowallet.com',
                'http://localhost:3000',
                'https://dxv77517aqbv5.cloudfront.net',
              ],
              methods: ['GET', 'HEAD', 'OPTIONS'],
              headers: ['content-type', 'x-api-key'],
              allowCredentials: false,
            },
          },
        },
      ],
    },
  },
  package: { individually: true },
}

module.exports = serverlessConfiguration
