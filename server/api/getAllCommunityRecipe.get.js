import db from "../../db";

export default defineEventHandler(async (event) => {
  const params = {
    TableName: "recipe",
  };

  const scanResults = [];

  await db
    .scan(params)
    .promise()
    .then((data) => {
      data.Items.forEach((item) => {
        scanResults.push(item);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return scanResults;
});
