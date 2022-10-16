import db from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const accessToken = event.req.body.accessToken || null;
  const config = useRuntimeConfig();
  const jwtAccessSecret = config.private.jwtAccessSecret;

  const authenticateToken = (token) => {
    try {
      let test = jwt.verify(token, jwtAccessSecret);
      return test;
    } catch (error) {
      return false;
    }
  };

  if (!accessToken) {
    return { user: null };
  }

  let authenticatedUser = authenticateToken(accessToken);

  db.query(
    {
      TableName: "user",
      KeyConditionExpression: "uniqueUserId = :uniqueUserId",
      ExpressionAttributeValues: {
        ":uniqueUserId": authenticatedUser.uniqueUserId,
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        // console.log("DATA", data);
        return data;
      }
    }
  );

  return { authenticatedUser };
});
