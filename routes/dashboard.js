const Express = require("express");
const router = Express.Router();
const Folder = require("../models/folder");
const User = require("../models/user")

router.get("/user-dashboard-details/:email", (request, response) => {
    const {email} = request.params;
    User.findOne({email}).then(data => {
        const id = data._id
        Folder.findOne({userId: id}).then(userData => {
            if(userData){
                response.json(userData)
            }
            else{
                response.json({"message": "Something went wrong"})
            }
        })
    }).catch(error => response.json({"message": "No User Details found"}))
})


module.exports = router;