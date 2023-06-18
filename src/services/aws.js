import {S3} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {Buffer} from 'buffer';

let ReactS3Client;
if (typeof window !== 'undefined') {
  Buffer.from('anything', 'base64');
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const creds = {
    region: 'us-east-2',
    credentials: {
      accessKeyId: 'AKIAQEXASG7F6QIACB4I',
      secretAccessKey: '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',
    },
  };
  ReactS3Client = new S3(creds);
}

const fileUploader = (file, path) => {
  return new Upload({
    client: ReactS3Client,
    params: {
      Bucket: 'monthly-goals',
      Key: path,
      Body: file,
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
    leavePartsOnError: false,
  });
};

export default fileUploader;
