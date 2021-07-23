const db = require("../models")
const col = db.Patient
module.exports = {
    findAll: (req,res) => {
        console.log("in patient controller findall")
        console.log(req.body)
        console.log(req.query)
        col
            .find(req.query)
            .then(model =>res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    find: (req,res) => {
        console.log("in patient controller find")
        console.log(req.body)
        console.log(req.query)
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