import db from "../../db";

export default defineEventHandler(async (event) => {
  const routeQuery = getQuery(event);
  const params = {
    TableName: "favorite",
    IndexName: "uid-index",
    KeyConditionExpression: "uid = :uid",
    ExpressionAttributeValues: {
      ":uid": routeQuery.uid,
    },
  };

  const result = new Promise((resolve, reject) => {
    db.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
  return result;
});
