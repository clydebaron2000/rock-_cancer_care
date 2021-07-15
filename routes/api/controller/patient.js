const db = require("../models")
const col = db.Patient
module.exports = {
    findAll: (req,res) => {
        col
            .find(req.query)
            .then(model => res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    create: (req,res) => { 
        console.log("recieved")
        console.log(req.body)
        col
            .create(req.body)
            .then(model => res.json(model))
            .catch(err => res.status(422).json(err))
    },
}