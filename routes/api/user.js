const router = require("express").Router()
const userController = require('./controller/user')

// '/api/user'
router.route("/")
router.route("/verify")
.get(userController.verify)
router.route("/admin")
  .get(userController.find)
  .delete(userController.delete)
  .post(userController.create)
  // .get(userController.findAll)
//   .update(userController.update)
module.exports = router; 
  