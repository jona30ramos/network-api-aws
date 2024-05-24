import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { environment } from '../constants/enviroment'

export const client = new S3Client({
    region: environment.awsRegion,
    credentials: environment.awsCredentials,
  })

export const saveFileInS3 = async (NameKey: string, jsonData: any) => {
    try {

        const jsonString = JSON.stringify(jsonData)

        const parameters: any = {
            Bucket: environment.awsBucket,
            Key: `testing-lambda/${NameKey}`,
            Body: jsonString,
          }
    
        parameters.ContentType = 'application/json'
        return await client.send(new PutObjectCommand(parameters))
    } catch (error) {
        return error
    }
}