import db from "../../db";

export default defineEventHandler((event) => {
  const params = getQuery(event);

  db.query(
    {
      TableName: "recipe",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": params.id,
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log(data);
        return data;
      }
    }
  );
  console.log(params);
});
