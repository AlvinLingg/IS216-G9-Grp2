import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = {
    TableName: "commentVotes",
    Item: {
      ridCidUid: body.ridCidUid,
      recipeId: body.recipeId,
      commentId: body.commentId,
      userId: body.userId,
      vote: body.vote,
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
