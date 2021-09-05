const express = require('express');
const dotenv = require("dotenv");
const session = require('express-session');
const cookie = require("cookie-parser");
const {redisClient} = require("./helpers/redis");

let RedisStore = require('connect-redis')(session);


dotenv.config({path: ".env-local"});
dotenv.config({path: ".env"});


const port =  process.env.PORT || 3001;


const app = express();

app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  //Max age is one day
  cookie: {maxAge: 86400000},
  name:"sid",
  resave: false,
  store: new RedisStore({client: redisClient})
}));
app.use(cookie());




app.get('/', (req, res) => {
  res.status(200).send('We are running');
});

const publicRouts = require("./routes/public");
const testRouts = require('./routes/test'); 
const userRouts = require('./routes/user');

const session_middleware = require('./helpers/session_middleware'); 

app.use("/user", publicRouts);

app.use("/api/user", session_middleware, userRouts);

if(process.env.DEBUG == 1)
  app.use("/test", session_middleware, testRouts);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});