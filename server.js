// to find html template file
const path = require("path")
// server deps
const express = require("express")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3001
// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
require('./server/middleware/index')(app)
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
// Add API routes
app.use(require('./routes'))
// connect to server 
require('./server/index.js')(app)
// serve up html skeleton
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});
// serve log
app.listen(PORT, () => {
  console.log(`Connecting server to port ${PORT}...`)
})