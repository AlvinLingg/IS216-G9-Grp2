import db from "../../db";

export default defineEventHandler(async (event) => {
  const params = {
    TableName: "user",
    IndexName: "profileHandle-index",
  };

  const scanResults = [];

  await db
    .scan(params)
    .promise()
    .then((data) => {
      console.log(data.Items);
      data.Items.forEach((item) => {
        scanResults.push(item.profileHandle);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return scanResults;
});
