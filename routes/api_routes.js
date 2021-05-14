const router = require('express').Router();
const db = require('../models');
const passport = require("../config");
//-------------------------------------------
//USER ROUTES
//-------------------------------------------
router.post('/api/user', ({
  body
}, res) => {
  db.users.create(body).then(dbUser => {
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
      res.status(400);
    })
  })
  // router.get('/user/:id', ({body, params}, res) => {
  //     db.users.findById(params._id, (error) => {
  //         if(error) throw error;
  //     }) .then(dbUser => {
  //         res.render(JSON.stringify(dbUser));
  //     })
  // })
  //-------------------------------------------
  //LOGIN ROUTES ROUTES
  //-------------------------------------------
router.post('/login', function(req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  }, passport.authenticate('local'), (req, res) => {
    console.log('logged in', req.user);
    res.send(req.user);
  })
  // router.post("/login", (req, res, next) => {
  //     passport.authenticate("local", (err, user, info) => {
  //       if (err) throw err;
  //       if (!user) res.send("No User Exists");
  //       else {
  //         req.logIn(user, (err) => {
  //           if (err) throw err;
  //           res.send("Successfully Authenticated");
  //           console.log(req.user);
  //         });
  //       }
  //     })(req, res, next);
  //   });
router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged Out Successfully');
})
router.get('/logged_in', (req, res) => {
  console.log(req.user);
  res.send(req.user);
})
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));
router.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
})
router.get("/auth/logout", (req, res) => {
  console.log("logging out!");
  res.send("Logout");
});
router.get("/user", (req, res) => {
  console.log("getting user data!: ", req.param.foo);
  // console.log("getting user data!: ", req.user);
  res.send(req.user);
});
//-------------------------------------------
//EVENT ROUTES ROUTES
//-------------------------------------------
router.post('/api/event', ({
  body
}, res) => {
  db.events.create(body).then(dbUser => {
    res.json(dbUser);
  }).catch(err => {
    res.status(404).json(err);
  })
});
router.get('/api/event/:url_end', ({
  body,
  params
}, res) => {
  db.events.find({
    url_end: params.url_end
  }).then(dbEvent => {
    res.send(dbEvent)
  }).catch(err => {
    res.status(400);
  })
})
router.get('/api/event/:_id', ({
  body,
  params
}, res) => {
  db.events.find({
    _id: params._id
  }).then(dbEvent => {
    res.send(dbEvent)
  }).catch(err => {
    res.status(400);
  })
})
router.put('/api/event/:_id', ({
  body,
  params
}, res) => {
  db.events.findByIdAndUpdate(params._id, {
    name: body.name,
    description: body.description,
    valid_dates: body.valid_dates,
    valid_times: body.valid_times,
    calendar_matrix: body.calendar_matrix,
    names_list: body.names_list,
    created_by: body.created_by,
    url_end: body.url_end
  }).then(dbEvent => {
    res.send(dbEvent);
  }).catch(err => {
    res.status(400);
  })
})
router.put('/api/event/:url_end', ({
  body,
  params
}, res) => {
  db.events.findOneAndUpdate({ url_end: body.url_end }, {
    name: body.name,
    description: body.description,
    valid_dates: body.valid_dates,
    valid_times: body.valid_times,
    calendar_matrix: body.calendar_matrix,
    names_list: body.names_list,
    created_by: body.created_by,
    url_end: body.url_end
  })
})
module.exports = router;