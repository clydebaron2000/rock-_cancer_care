const db = require("../models")
const col = db.Patient
const devConsole = require('../../../server/utils/devConsole')
module.exports = {
    findAll: (req,res) => {
        devConsole.log("in patient controller findall")
        devConsole.log("req.query",req.query)
        let query=req.query
        if(Object.keys(req.query).length!==0){
            // console.log('query:',query)
            Object.keys(query).forEach(key=>{
                console.log(query[key])
                if(query[key]?.indexOf("{")!==-1){
                    query[key]=JSON.parse(query[key])
                }
            })
            // console.log(query["first name"])
        }
        devConsole.log("query",query)
        col
            .find(query)
            .then(model =>res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    find: (req,res) => {
        devConsole.log("in patient controller find")
        devConsole.log(req.body)
        devConsole.log(req.query)
        col
            .findOne(req.query)
            .then(model => res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    create: (req,res) => { 
        devConsole.log("recieved")
        devConsole.log(req.body)
        col
            .create(req.body)
            .then(model => res.json(model))
            .catch(err => res.status(422).json(err))
    },
}