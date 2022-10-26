import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRouter from "./apps/post.js";




async function init() {
  const app = express();
  const port = 4001;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/posts", postRouter);

  app.get("/", async (req, res) => {
    return res.send("Hello!")
  });

  app.get("*", (req, res)=>{
    res.status(404).send("404 Not found");
})

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}


init();