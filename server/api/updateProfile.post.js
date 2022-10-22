import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = {
    TableName: "recipe",
    Item: {
      id: Date.now().toString(),
    },
  };

  const result = new Promise((resolve, reject) => {
    db.put(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return result;
});
