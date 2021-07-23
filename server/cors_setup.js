const cors = require('cors');
module.exports = (app)=>{
    app.use(cors());
    const loginoptions = {
        origin: true,
        methods: ["GET,POST,PUT,DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      };
    app.options(router, cors(loginoptions));
}