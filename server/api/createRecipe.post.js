import db from "../../db";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body);

  const result = new Promise((resolve, reject) => {
    db.put(
      {
        TableName: "recipe",
        Item: {
          id: Date.now().toString(),
          recipeName: body.recipeName,
          servingSize: body.servingSize,
          cookingTime: body.cookingTime,
          difficulty: body.difficulty,
          ingredients: JSON.stringify(body.ingredients),
          instructions: JSON.stringify(body.instructions),
          images: JSON.stringify(body.images.map((image) => image.url)),
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
