import { generateUploadURL } from "../../s3";
export default defineEventHandler(async (event) => {
  return generateUploadURL()
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
});
