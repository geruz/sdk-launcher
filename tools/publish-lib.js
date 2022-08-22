import aws from 'aws-sdk';
import envConfig from 'dotenv';
import fs from 'fs/promises';

const LIB_FILE_NAME = 'getid-web-sdk-launcher-v7.min.js';
const PATH_TO_LIB = `${__dirname}/../lib/${LIB_FILE_NAME}`;
const uploadLib = async () => {
  envConfig.config();
  const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    REGION,
    BUCKET,
    DISTRIBUTION_ID
  } = process.env;

  const config = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
    Bucket: BUCKET,
  };

  aws.config.update(config);
  const s3 = new aws.S3(config);
  const fileLib = await fs.readFile(PATH_TO_LIB, 'utf-8');

  const params = {
    Bucket: `${BUCKET}/sdk`,
    Key: LIB_FILE_NAME,
    Body: fileLib,
    ACL: 'private',
    ContentType: 'text/javascript',
    DistributionId: DISTRIBUTION_ID,

  };
  s3.upload(params, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('file successfully uploaded', result);
  });
};

const invalidate = async () => {
  envConfig.config();
  const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    REGION,
    BUCKET,
    DISTRIBUTION_ID
  } = process.env;

  const config = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
    Bucket: BUCKET,
  };
  aws.config.update(config);
  const cloudFront = new aws.CloudFront(config);

  const params = {
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: `${Date.now()}`,
      Paths: {
        Quantity: 1,
        Items: [
          '/sdk/getid-web-sdk-launcher-v7*',
        ]
      }
    }
  };

  cloudFront.createInvalidation(params, (err, res) => {
    if (err) {
      console.error(err);
    }
    if (res) {
      console.log(res);
      console.log('invalidation started')
    }
  });
};

uploadLib();
invalidate();
