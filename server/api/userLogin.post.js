import db from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const config = useRuntimeConfig();
  if (!body.email || !body.uniqueUserId) return;

  const getRequestParams = {
    TableName: "user",
    KeyConditionExpression: "uniqueUserId = :uniqueUserId",
    ExpressionAttributeValues: {
      ":uniqueUserId": body.uniqueUserId,
    },
  };

  const postRequestParams = {
    TableName: "user",
    Item: {
      uniqueUserId: body.uniqueUserId,
      email: body.email,
      profilePicture: "",
      address: "",
      displayName: "",
    },
  };

  // Adds user to db
  const addToDb = (postRequestParams) => {
    db.put(postRequestParams, (err, data) => {
      if (err) {
        return err;
      } else {
        return data;
      }
    });
  };

  // Check if user exists in db, if not, add email + uniqueUserId to db + default values
  db.query(getRequestParams, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      if (data.Count === 0) {
        addToDb(postRequestParams);
      } else {
        console.log(data);
        return data;
      }
    }
  });

  const accessToken = jwt.sign(
    { email: body.email, uniqueUserId: body.uniqueUserId },
    config.private.jwtAccessSecret,
    { expiresIn: "7 days" }
  );

  // TODO: (if have time) Add refresh token and user's unique id to database table 'refreshToken'
  // const refreshToken = jwt.sign(
  //   { email: body.email, uniqueUserId: body.uniqueUserId },
  //   config.private.jwtAccessSecret
  // );

  return { accessToken: accessToken };
});

// 1. Acc creation wif magic
// 2. Acc creation into our db
// 3. Redirection upon (1), with user state stored into cookies (persisted state)
