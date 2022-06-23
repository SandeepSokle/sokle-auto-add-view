const express = require("express");


const cors = require("cors");
const blogsRouter = require("./src/routers/blogsRouter");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(cors());



const host = process.env.PORT || 8080;
app.listen(host, () => {
  console.log(`Server run on local host : ${host}`);
});


app.use("/blogs", blogsRouter);
