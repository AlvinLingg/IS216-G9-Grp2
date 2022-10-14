import AWS from "aws-sdk";

const runtimeConfig = useRuntimeConfig();
// Update AWS config
AWS.config.update({
  accessKeyId: runtimeConfig.private.dbAccessKeyId,
  secretAccessKey: runtimeConfig.private.dbSecretAccessKey,
  region: "us-east-1",
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default db;
