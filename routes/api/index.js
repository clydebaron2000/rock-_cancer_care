const router = require("express").Router()
// const patientIntake  = require("./patientIntake")
const testRoutes  = require("./test")

// api routes
// router.use("/patientIntake", patientIntake)
console.log('adding /test routes')
router.use("/test", testRoutes)

module.exports = router