import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRouter from "./apps/post.js";




async function init() {
    const app = express();
    const port = 5432;

    app.use(cors());
    app.use(bodyParser.json());
    app.use("/posts", postRouter);

    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
      });
    }
    

init();