const uploadToS3 = require('../helper/fileUpload')
const createFolder = require("../helper/createFolder")
const Express = require("express");
const router = Express.Router();




router.post("/upload/:id", (request, response) => {
    const file = request.files.file;
    const id = request.params.id
    const status = uploadToS3(file, response, id)
})

router.post("/create-folder/:id", (request, response) => {
    const folderName = request.body.name;
    const id = request.params.id
    createFolder(folderName, response, id)
})


module.exports = router;