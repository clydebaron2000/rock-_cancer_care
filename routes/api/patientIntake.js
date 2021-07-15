const db = require('./models');
module.exports = (router)=>{
  router.post('/api/test', ({body}, res) => {
    console.log("post  /api/test triggered")
    db.test.create(body).then(dbUser => {
      res.json(dbUser);
    }).catch(err => {
      res.status(404).json(err);
    })
  });
  router.get('/api/user/:email', ({
      body,
      params
    }, res) => {
      db.users.find({
        email: params.email
      }).then(dbUser => {
        res.send(dbUser)
      }).catch(err => {
        res.status(400)
      })
    })
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
}

