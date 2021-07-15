module.exports = ()=>{
    const username  =  process.env.MONGODB_USERNAME || 'clyde' 
    const password  =  process.env.MONGODB_PASSWORD || 'Inf1nity'
    const cluster   =  process.env.MONGODB_CLUSTER  || 'cluster0'
    const database  =  process.env.MONGODB_DATABASE || 'rock-cancer-care'
    // concating URI   
    const URI = process.env.DB || `mongodb+srv://${username}:${password}@${cluster}.8bu0v.mongodb.net/${database}?retryWrites=true&w=majority`
    process.env.DB = URI
    return URI
} 