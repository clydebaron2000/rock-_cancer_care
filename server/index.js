const mongoose = require('mongoose')
module.exports = async (app)=>{
  try{
    const connectionSettings={
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    await mongoose.connect(require('../config/uri')(),connectionSettings)
    console.log('Connected to Database!')
  } catch(err){ 
    console.log('Connection Error:')
    console.error(err)
  }
}  