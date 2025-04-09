import dotenv from 'dotenv'; 
dotenv.config() 
import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './env';

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID!,
  secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  region: 'eu-north-1',
});

const s3 = new AWS.S3();

export default s3;
