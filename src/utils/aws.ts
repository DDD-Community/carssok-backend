import * as AWS from '@aws-sdk/client-s3';
import * as AWSSDK from 'aws-sdk';
AWSSDK.config.update({
  credentials: {
    accessKeyId: 'AKIA4DFKNUHRJPPXTAEV',
    secretAccessKey: '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',
  },
});
export const s3Client = new AWS.S3({
  region: process.env.AWS_REGION as string,
});
