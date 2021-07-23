const router = require("express").Router()
const patientController = require('./controller/patient')
  router.route("/")
    .post(patientController.create)
    .get(patientController.findAll)
  module.exports = router
  // router.put('/api/event/:_id', ({
  //   body,
  //   params
  // }, res) => {
  //   db.events.findByIdAndUpdate(params._id, {
  //     name: body.name,
  //     description: body.description,
  //     valid_dates: body.valid_dates,
  //     valid_times: body.valid_times,
  //     calendar_matrix: body.calendar_matrix,
  //     names_list: body.names_list,
  //     created_by: body.created_by,
  //     url_end: body.url_end
  //   }).then(dbEvent => {
  //     res.send(dbEvent);
  //   }).catch(err => {
  //     res.status(400)
  //   })
  // })


