import db from "../../db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = {
    TableName: "commentVotes",
    IndexName: "commentId-index",
    KeyConditionExpression: "commentId = :commentId",
    ExpressionAttributeValues: {
      ":commentId": query.commentId,
    },
  };

  const results = { userVote: 0, voteCount: 0 };

  await db
    .query(params)
    .promise()
    .then((data) => {
      let voteCount = 0;
      console.log("data", data.Items);
      data.Items.forEach((item) => {
        voteCount += item.vote;
        if (query.userId === item.userId) {
          results.userVote = item.vote;
        }
      });
      results.voteCount = voteCount;
    })
    .catch((error) => {
      console.log(error);
    });
  return results;
});
