import db from "../../db";

export default defineEventHandler((event) => {
  const routeQuery = getQuery(event);
  const params = {
    TableName: "recipe",
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

  //try accessing http://localhost:3000/api/hello?id=10
  return result;
});
