import {S3} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {Buffer} from 'buffer';

let ReactS3Client;
if (typeof window !== 'undefined') {
  Buffer.from('anything', 'base64');
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const creds = {
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
    },
  };
  ReactS3Client = new S3(creds);
}

const fileUploader = (file, path) => {
  return new Upload({
    client: ReactS3Client,
    params: {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: path,
      Body: file,
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
    leavePartsOnError: false,
  });
};

export default fileUploader;
