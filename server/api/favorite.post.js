import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body);

  db.put(
    {
      TableName: "favorite",
      Item: {
        id: body.rid + body.uid,
        rid: body.rid,
        uid: body.uid,
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
