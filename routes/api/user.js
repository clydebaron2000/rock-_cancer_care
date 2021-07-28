const router = require("express").Router()
const userController = require('./controller/user')

// '/api/user'
router.route("/")
  .post(userController.create)
  .get(userController.find)
router.route("/verify")
  .get(userController.verify)
router.route("/admin")
  .delete(userController.delete)
  .get(userController.findAll)
//   .update(userController.update)
module.exports = router; 
  