import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = {
    TableName: "user",
    Key: {
      uniqueUserId: body.uniqueUserId,
    },
    UpdateExpression:
      "set #display_name = :display_name, #profile_handle = :profile_handle, #profile_picture = :profile_picture",
    ExpressionAttributeNames: {
      "#display_name": "displayName",
      "#profile_handle": "profileHandle",
      "#profile_picture": "profilePicture",
    },
    ExpressionAttributeValues: {
      ":display_name": body.displayName,
      ":profile_handle": body.profileHandle,
      ":profile_picture": body.profilePicture,
    },
  };

  const result = new Promise((resolve, reject) => {
    db.update(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return result;
});
