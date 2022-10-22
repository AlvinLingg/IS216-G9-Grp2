import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = {
    TableName: "favorite",
    Key: {
      id: body.id,
    },
  };

  const result = new Promise((resolve, reject) => {
    db.delete(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return result;
});
