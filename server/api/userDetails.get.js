import db from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const authenticateToken = (token) => {
    try {
      let test = jwt.verify(token, jwtAccessSecret);
      return test;
    } catch (error) {
      return false;
    }
  };

  const accessToken = event.req.body.accessToken || null;
  const config = useRuntimeConfig();
  const jwtAccessSecret = config.private.jwtAccessSecret;

  if (!accessToken) {
    return { user: null };
  }

  let authenticatedUser = authenticateToken(accessToken);
  if (!authenticatedUser) {
    return { user: null };
  }

  const getQueryParams = {
    TableName: "user",
    KeyConditionExpression: "uniqueUserId = :uniqueUserId",
    ExpressionAttributeValues: {
      ":uniqueUserId": authenticatedUser.uniqueUserId,
    },
  };

  const result = new Promise((resolve, reject) => {
    db.query(getQueryParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return result;
});
