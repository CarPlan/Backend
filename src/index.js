const express = require('express');
const app = express();
app.use(express.json({limit:'1mb'}));
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api', (req, res) => {
    console.log(req.body);
    res.json({
        status:'succsess'
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});