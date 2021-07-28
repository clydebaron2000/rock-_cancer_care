const db = require("../models")
const col = db.User
const bcyrpt = require('bcrypt')
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
            .findOne(req.query)
            .then(model => res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    create: async(req,res) => { 
        console.log("create")
        console.log(req.body)
        try{
            const username = req.query.username
            const password = req.query.password
            if (username === undefined || password === undefined ||
                username === "" || password === "")
                return res.status(422).json("username and password required")
            req.body.password = await bcyrpt.hash(password,10)
            col
                .create(req.body)
                .then(model => res.json(model))
                .catch(err => res.status(422).json(err))
        }catch{
            res.status(500).send()
        }
    },
    delete:(req,res)=>{
        console.log("DELETE")
        if(req.body.roleName !== "admin"){
         col
         .deleteOne(req.body)
         .then(model => res.json(model))
         .catch(err => res.status(422).json(err))
        }
    },
    verify: async (req,res)=>{
        console.log("verifying")
        console.log(req.query)
        console.log(Object.keys(req.query).length)
        if (Object.keys(req.query).length===0)
            return res.status(422).json("invalid query format")
        try{
            const username = req.query.username
            const password = req.query.password
            if (username === undefined || password === undefined ||
                username === "" || password === "")
                return res.status(422).json("username and password required")
            console.log({username:username})
            col.findOne({username:username})
            .then(model=>{
                console.log(password)
                bcyrpt.compare(password,model.password).then(result=>{
                    if(result) res.json(model._id)
                    else res.json(null)
                }).catch(err => res.status(422).json("invalid username or password"))
            })
            .catch(err => res.status(422).json(err))// should not be reached
        }catch{
            res.status(500).send()
        }
    }
}