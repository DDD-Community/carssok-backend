import * as AWS from '@aws-sdk/client-s3';
import * as AWSSDK from 'aws-sdk';
AWSSDK.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export const s3Client = new AWS.S3({
  region: process.env.AWS_REGION as string,
});
