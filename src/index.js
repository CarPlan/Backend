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

app.use("/api", userRouter);

app.get('/api/user', (req, res) => {
    console.log(req.body);
    res.json({
        status:'succsess'
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});