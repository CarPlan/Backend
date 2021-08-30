const express = require('express');
const dotenv = require("dotenv");

dotenv.config({path: ".env-local"});


const port =  process.env.PORT || 3001;


const app = express();

app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:false}));





app.get('/', (req, res) => {
  res.status(200).send('We are running');
});

const userRouter = require("./routes/user");

const JWT_HELPER = require('./helpers/jwt_helper'); 
const Test = require('./routes/test'); 

app.use("/api", userRouter);

app.use("/test", JWT_HELPER, Test);

app.get('/api/user', (req, res) => {
    console.log(req.body);
    res.json({
        status:'succsess'
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});