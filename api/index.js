import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../s3";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mywad2bucket",
    key: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
    },
  }),
});

app.post("/upload", upload.array("files"), function (req, res, next) {
  res.send({
    message: "Uploaded!",
    urls: req.files.map(function (file) {
      return {
        url: file.location,
        name: file.key,
        type: file.mimetype,
        size: file.size,
      };
    }),
  });
});

export default {
  path: "/api",
  handler: app,
};
