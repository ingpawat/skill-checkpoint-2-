
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {post} from "./apps/post.js";
import {client} from "./utils/db.js"




async function init() {
    await client.connect();
    const app = express();
    
    const port = 27017;

    app.use(cors());
    app.use(bodyParser.json());
    app.use("/", post);

    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });

}

init();