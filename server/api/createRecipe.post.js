import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body.image);

  const result = new Promise((resolve, reject) => {
    db.put(
      {
        TableName: "recipe",
        Item: {
          id: Date.now().toString(),
          cookingTime: body.cookingTime,
          difficulty: body.difficulty,
          image: body.image[0].url,
          instructions: JSON.stringify(body.instructions),
          recipeName: body.recipeName,
          servingSize: body.servingSize,
          ingredients: JSON.stringify(body.ingredientsNeeded),
          userId: body.userId,
        },
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
  return result;
});
