const devConsole={
    log:(...data)=>{
        if (process.env.NODE_ENV==="development"){
            console.log(...data)
        }
    },
    error:(...data)=>{
        if (process.env.NODE_ENV==="development"){
            console.error(...data)
        }
    }
}
module.exports = devConsole