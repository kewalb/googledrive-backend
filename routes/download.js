const AWS = require("aws-sdk");
const fs = require("fs");
const env = require("dotenv");
const Express = require("express");
const router = Express.Router();
let path = require("path");

env.config();

router.get("/download/:filename", (request, response) => {
  const { filename } = request.params;
  const BUCKET = process.env.BUCKET;
  const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
  // initialize s3
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    Bucket: BUCKET,
  });

  const params = {
    Bucket: BUCKET,
    Key: filename,
  };
  console.log(typeof filename);
  s3.getObject(params, (error, data) => {
    console.log(data);
    if (error) {
      return error;
    }
    let absPath = path.join(__dirname, "/my_files/", filename);
    let relPath = path.join("./my_files", filename); // path relative to server root

    fs.writeFile(relPath, data.Body, (err) => {
      if (err) {
        console.log(err);
      }
      response.download(relPath, (err) => {
        if (err) {
          console.log(err);
        }
        fs.unlink(relPath, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("FILE [" + filename + "] REMOVED!");
        });
      });
    });

    // response.download(data.Body);
    // response.end();
  });
});

module.exports = router;
