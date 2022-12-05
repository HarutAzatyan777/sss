import express from "express";
import fs  from "fs"
import path from "path"; 

const app = express();

app.use((req, res, next) => {
  console.log(req.url); // next
  next();
});
app.use(express.static("public")); //stugel failer kan

app.use(express.json());

app.get("/", (req, res) => {
  req.redirect("./index.html"); // chanapar
});
app.get("/hello", (req, res) => {
  res.send("oooo");
});
app.get("/bye", (req, res) => {
  res.send({
    name: "Vzgo",
  });
});



app.get("/todos", (req, res) => {
  fs.promises.readFile(path.resolve("data.json"),"utf8").then((todos)=>{
    res.send(todos);
  })
  
});
app.post("/todos", function (req, res) {
  fs.promises
  .writeFile(path.resolve("data.json"),JSON.stringify(req.body,undefined,2))
  .then(()=>{
    res.send('Todos received')
  })
  
})
// app.post("/hi", (req, res) => {
//   res.send("amen inch lav e");
// });

app.listen(3001);
