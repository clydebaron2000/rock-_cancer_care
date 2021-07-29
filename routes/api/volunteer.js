const router = require("express").Router()
const volunteerController = require('./controller/volunteer')
  router.route("/")
    .post(volunteerController.create)
    .get(volunteerController.find)
  router.route("/all")
    .get(volunteerController.findAll)

  module.exports = router


