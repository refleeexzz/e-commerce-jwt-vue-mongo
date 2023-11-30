const express = require(`express`);
const cors = require(`cors`);

const mongoose = require(`mongoose`)
const morgan = require(`morgan`)

const app = express();

// ===> Import this archive `db.config.js`
const database = require('./config/db.config')  // ===> local conection of database

// ===> connection database
mongoose.connect(database.local.localDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
    }).then(() => {
        console.log('connect on database successful')},
        (err)=>{
        console.log(`error in connect database`);
        process.exit();
})
    



// ==> api routes:
const index=require (`./routes/user.routes`)

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.json({type: `application/vnd.api+json`}));
app.use(cors());
app.use(morgan('dev'));



//TODO: then include the rout call 'user.routes.js'

module.exports = app;