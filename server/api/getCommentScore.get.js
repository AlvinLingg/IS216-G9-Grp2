import db from "../../db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = {
    TableName: "commentVotes",
    IndexName: "recipeId-index",
    KeyConditionExpression: "recipeId = :recipeId",
    ExpressionAttributeValues: {
      ":recipeId": query.recipeId,
    },
  };

  const results = {};

  await db
    .query(params)
    .promise()
    .then((data) => {
      data.Items.forEach((item) => {
        if (!(item.commentId in results)) {
          results[item.commentId] = { userVote: 0, voteCount: 0 };
        }
        results[item.commentId].voteCount += item.vote;
        if (item.userId === query.userId) {
          results[item.commentId].userVote = item.vote;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return results;
});
