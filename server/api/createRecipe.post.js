import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  // console.log(body);

  const result = new Promise((resolve, reject) => {
    db.put(
      {
        TableName: "recipe",
        Item: {
          id: Date.now().toString(),
          cookingTime: body.cookingTime,
          difficulty: body.difficulty,
          images: JSON.stringify(body.images.map((image) => image.url)),
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
