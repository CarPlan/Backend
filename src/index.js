const express = require('express');
const dotenv = require("dotenv");

dotenv.config({path: ".env-local"});
dotenv.config({path: ".env"});


const port =  process.env.PORT || 3001;


const app = express();

app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:false}));





app.get('/', (req, res) => {
  res.status(200).send('We are running');
});

const publicRouts = require("./routes/public");
const testRouts = require('./routes/test'); 
const userRouts = require('./routes/user');

const jwtMiddleware = require('./helpers/jwt_middleware'); 

app.use("/user", publicRouts);

app.use("/api/user", jwtMiddleware, userRouts);

if(process.env.DEBUG == 1)
  app.use("/test", jwtMiddleware, testRouts);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});