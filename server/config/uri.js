module.exports = ()=>{
    const username  =  process.env.MONGODB_USERNAME  
    const password  =  process.env.MONGODB_PASSWORD 
    const cluster   =  process.env.MONGODB_CLUSTER  
    const database  =  process.env.MONGODB_DATABASE 
    // concating URI   
    const URI = process.env.DB || `mongodb+srv://${username}:${password}@${cluster}.8bu0v.mongodb.net/${database}?retryWrites=true&w=majority`
    process.env.DB = URI
    return URI
} 