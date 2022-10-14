import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body);

  db.put(
    {
      TableName: "recipe",
      Item: {
        id: Date.now().toString(),
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
});
