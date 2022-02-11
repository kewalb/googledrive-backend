const AWS = require('aws-sdk');
const env = require('dotenv');
const DriveContent = require("../models/folder");

env.config()

// environment variables.
const BUCKET = process.env.BUCKET;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

function addToDb(folder, id) {
  DriveContent.findOne({ userId: id }).then((data) => {
    const id = data._id
    DriveContent.findByIdAndUpdate(id, { $push: { folders: folder } }, (error, updatedData) => {
      if (error){
        console.log(error)
      }
      else{
        console.log(updatedData)
      }
    })
  }
)};

// function to upload file in S3 bucket using aws-sdk
module.exports = function(folder, response, id) {
    let s3bucket = new AWS.S3({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      Bucket: BUCKET
    });
    s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET + `/${folder}`,
          Key: "",
          Body: ""
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            response.json({"message": "Something went wrong"})
          }
          if(data){
            addToDb(folder, id)
            response.json({"message": "Folder created successfully"});
          }
        });
    });
  }