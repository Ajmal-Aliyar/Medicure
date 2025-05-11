import dotenv from 'dotenv'; 
dotenv.config() 
import AWS from 'aws-sdk';
import { env } from './env';

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  region: 'eu-north-1',
});

const s3 = new AWS.S3();

export default s3;
