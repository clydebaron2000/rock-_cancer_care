const router = require("express").Router()
const testController = require('./controller/test')
// const upload = require('../../server/middleware/fileUpload')
// '/api/test'
router.route("/")
  .get(testController.findAll)
  .post(testController.create)
// router.route("/upload")
//   .post(upload.single('file'),(req,res)=>{
//     if (req.file === undefined) return res.send("please select a file")
  
//   })
module.exports = router; 
 