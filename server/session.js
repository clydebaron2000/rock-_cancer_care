const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
module.exports = (app)=>{
    // app.use(session({
    //     secret: 'waggle-fraggle', //pick a random string to make the hash that is generated secure
    //     store: new MongoStore({ mongooseConnection: connection }),
    //     resave: false, //required
    //     saveUninitialized: false //required
    // }))
}