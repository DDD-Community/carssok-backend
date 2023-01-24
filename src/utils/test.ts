import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const imageUploader = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        //왜 env적용이 안되는거지..?
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: 'ap-northeast-2',
    }),
    bucket: 'carssok',
    key: function (request, file, cb) {
      cb(null, `carssok/${Date.now().toString()}-${file.originalname}`);
    },
    acl: 'public-read',
  }),
});

export default imageUploader;
