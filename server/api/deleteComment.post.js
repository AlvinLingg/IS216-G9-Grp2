import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body.commentId);
  const params = {
    TableName: "comments",
    Key: {
      commentId: body.commentId,
      recipeId: body.recipeId,
    },
    UpdateExpression: "set #comment_body = :comment_body, #userId = :userId",
    ExpressionAttributeNames: {
      "#comment_body": "commentBody",
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":comment_body": "[comment deleted by user]",
      ":userId": "[deleted]",
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

  let status = null;
  await db
    .update(params)
    .promise()
    .then((data) => {
      status = true;
    })
    .catch((error) => {
      status = false;
    });

  return status;
});
