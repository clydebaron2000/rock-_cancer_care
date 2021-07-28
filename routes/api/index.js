const router = require("express").Router()
const patient  = require("./patient")
const user = require('./user')
// const testRoutes  = require("./test")

// api routes
console.log('adding /patient routes')
router.use("/patient", patient)
console.log('adding /user routes')
router.use("/user", user)
//if no route in api hit, send 
router.use((req, res)=> {
    res.status(400)
});
module.exports = router