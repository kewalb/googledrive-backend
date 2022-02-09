const uploadToS3 = require('../helper/fileUpload')
const createFolder = require("../helper/createFolder")
const Express = require("express");
const router = Express.Router();




router.post("/upload", (request, response) => {
    const file = request.files.file;
    const id = request.body.id
    const status = uploadToS3(file, response, id)
})

router.post("/create-folder", (request, response) => {
    const folderName = request.body.name;
    const id = request.body.id
    createFolder(folderName, response, id)
})


module.exports = router;