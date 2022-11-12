import db from "../../db";

export default defineEventHandler(async (event) => {
  const routeQuery = getQuery(event);
  const params = {
    TableName: "recipe",
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": routeQuery.userId,
    },
  };
  let result = [];
  await db
    .query(params)
    .promise()
    .then((data) => {
      result = data.Items;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
});
