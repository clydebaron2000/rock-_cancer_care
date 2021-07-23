const router = require("express").Router()
const patientController = require('./controller/patient')
  router.route("/")
    .post(patientController.create)
    .get(patientController.find)
  router.route("/all")
    .get(patientController.findAll)

  module.exports = router


