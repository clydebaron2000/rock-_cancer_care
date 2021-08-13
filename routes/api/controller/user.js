const db = require("../models")
const col = db.User
const bcyrpt = require('bcrypt')
module.exports = {
    findAll: (req,res) => {
        console.log("in user controller find all")
        console.log(req.body)
        console.log(req.query)
        col
            .find(req.query)
            .then(model =>res.json(model))
            .catch(err => res.status(422).json(err))
    }, 
    find: (req,res) => {
        console.log("in user controller find")
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
        // console.log(req.query)
        try{
            const username = req.body.username
            const password = req.body.password
            console.log("u:",username)
            console.log("p:",password)
            if (username === undefined || password === undefined ||
                username === "" || password === ""){
                    console.log("none")
                    return res.status(422).json("username and password required")
            }
            console.log("finding")
            const found = await col.findOne({username:username}).exec()
            console.log(found)
            if (found!==null && found?.username !== username)return res.status(409).json("username exists in database")
            console.log("creating")
            // TODO comment out after testing
            req.body.authorization="admin"
            // req.body.authorization="manager"
            req.body.change_permissions=false
            req.body.password = await bcyrpt.hash(password,10)
            col
                .create(req.body)
                .then(model => res.status(201).json(model["_id"]))
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
        else{
            res.status(401).json()
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
                    if(result) {
                        console.log("success")
                        res.status(202).json(model._id)
                    }
                    else {
                        console.log("fail")
                        res.status(401).json("invalid username or password")
                    }
                }).catch(err => res.status(404).json("invalid username or password"))
            })
            .catch(err => res.status(401).json(err))// should not be reached
        }catch{
            res.status(500).send()
        }
    }
}