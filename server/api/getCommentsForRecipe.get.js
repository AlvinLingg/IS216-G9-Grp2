import db from "../../db";

export default defineEventHandler(async (event) => {
  const apiQuery = getQuery(event);
  if (!apiQuery.recipeId) return false;

  const profileHandleQueryParams = {
    TableName: "user",
    IndexName: "profileHandle-retrievePictureAndHandle",
  };

  const allProfileHandles = {};

  await db
    .scan(profileHandleQueryParams)
    .promise()
    .then((data) => {
      data.Items.forEach((item) => {
        allProfileHandles[item.uniqueUserId] = {
          profileHandle: item.profileHandle,
          profilePicture: item.profilePicture,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });

  let recipeId = apiQuery.recipeId;

  const commentsQueryParams = {
    TableName: "comments",
    IndexName: "recipeId-index",
    KeyConditionExpression: "recipeId = :recipeId",
    ExpressionAttributeValues: {
      ":recipeId": recipeId,
    },
  };

  const results = [];

  await db
    .query(commentsQueryParams)
    .promise()
    .then((data) => {
      data.Items.forEach((item) => {
        results.push({
          recipeId: item.recipeId,
          parentCommentId: item.parentCommentId,
          commentId: item.commentId,
          commentBody: item.commentBody,
          userId: item.userId,
          profileHandle: allProfileHandles[item.userId].profileHandle,
          profilePicture: allProfileHandles[item.userId].profilePicture,
          createdAt: item.createdAt,
        });
      });
      results.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      );
    })
    .catch((error) => {
      console.log(error);
    });

  return results;
});
