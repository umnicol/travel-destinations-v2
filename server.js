const http = require('http');
const mongodb = require('mongodb').MongoClient
const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 5001;

let db;
let connectionString = `mongodb://localhost:27017/travelDestinations`

mongodb.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      db = client.db()
    }
  )

const server = http.createServer((req, res) => {
    const nameObject = { title: "",
                         location:"",
                         country: "" };
    db.collection('destinations').insertOne(nameObject, function (err, info) {
        //executes after the insertion.
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Name created');
    })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.json())

app.get('/destinations', (req, res) => {
  res.send('Hello World!')
})
app.post("/destinations", function(req, res) {
    console.log(req.body); // to read the req.body, in postman fill out the body and select "raw"
    
    res.send("Post request")
})
app.put("/destinations/:id", (req, res) => {
    res.send("Put")
    console.log(req.params.id);
})
app.delete("/destintations/:id", (req, res) => {
    res.send("Delete")
    console.log(req.params.id);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
