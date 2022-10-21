import db from "../../db";

export default defineEventHandler(async (event) => {
  const routeQuery = getQuery(event);
  const params = {
    TableName: "favorite",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": routeQuery.id,
    },
  };

  const result = new Promise((resolve, reject) => {
    db.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return result;
});
