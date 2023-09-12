const express = require("express");
const app = express();
const port = 3000;
const fruits = require("./fruits.json");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello! Fruity");
});

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
  fruitEntry = req.params.name;
  const fruit = fruits.find(
    (item) => item.name.toLowerCase() === fruitEntry.toLowerCase()
  );
  if (!fruit) {
    res.status(404).send("bad request");
  } else {
    console.log(req.params.name);
    res.send(fruit);
  }
});

const ids = fruits.map((fruit) => {
  fruit.id;
});
let maxId = Math.max(...ids);

//add a new piece of fruit to the data
app.post("/fruits", (req, res) => {
  const newFruit = req.body.name;
  const existingFruit = fruits.find(
    (fruit) => fruit.name.toLowerCase() === newFruit.toLowerCase()
  );
  if (!existingFruit) {
    //express.json()-> will parse req.body so we can work with it in the server -> for post, and also patch as the new data is getting sent pack
    //as an laternative to not keep calling express.json() is middleware
    //middleware-> the code that is executed between the request coming in and the ..
    //-> so it makes sure every request goes through middleware first
    maxId += 1;
    req.body.id = maxId;
    fruits.push(req.body);
    res.status(201).send("new fruit created");
  } else {
    res.status(409).send("fruit already exists");
  }
});
//express.json() already includes req, res, next

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
