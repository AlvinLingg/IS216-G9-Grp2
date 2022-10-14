import AWS from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const runtimeConfig = useRuntimeConfig();
// Update AWS config
AWS.config.update({
  accessKeyId: runtimeConfig.private.dbAccessKeyId,
  secretAccessKey: runtimeConfig.private.dbSecretAccessKey,
  region: "us-east-1",
  signatureVersion: "v4",
});

const s3 = new AWS.S3();
const bucketName = "mywad2bucket";

export async function generateUploadURL() {
  let rawBytes = await randomBytes(16);
  let imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  let uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

export default s3;
