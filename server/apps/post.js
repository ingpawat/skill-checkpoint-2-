import Router from "express";
import { pool } from "../utils/db.js";

const postRouter = Router();

//** GET **/ //
postRouter.get("/", async (req, res) => {
    const category = req.query.category || "";
    const keywords = req.query.keywords || "";
    let query = "";
    let values = [];

    if (category && keywords) {
        query = `select * from posts
    where category = $1
    and topic ilike $2
    limit 10
    `;
        values = [category, keywords];
    } else if (category) {
        query = `
    select * from posts
    where category = $1
    limit 10
    `;
        values = [category];
    } else {
        query = `
    select * from posts
    limit 10
    `;
    }

    const results = await pool.query(query, values);

    return res.json({
        data: results.rows,
    });
});

//** GET ID **/ //
postRouter.get("/:postId", async (req, res) => {
    const postId = req.params.postId;

    const result = await pool.query(
        `
    select * 
    from posts 
    where post_id = $1
    `,
        [postId]
    );

    return res.json({
        data: result.rows[0],
    });
});

//** POST **/ //
postRouter.post("/", async (req, res) => {
    const newPost = {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
    };

    await pool.query(
        `
    insert into posts(title, content , agree, disagree,)
    values ($1, $2, $3, $4,)
    `,
        [
            newPost.title,
            newPost.content,
            newPost.agree,
            newPost.disagree,
        ]
    );

    await pool.query(`
  insert into category()
  `);

    return res.json({
        message: "Created a post was successfully",
    });
});

//** PUT **/ //
postRouter.put("/:id", async (req, res) => {
    const updatedPost = {
        ...req.body,
        updated_at: new Date(),
    };

    await pool.query(
        `
        update posts
        set title = $1, content = $2, agree = $3, disagree = $4
        where post_id = $5
    `,
        [
            updatedPost.title,
            updatedPost.content,
            updatedPost.agree,
            updatedPost.disagree,
            req.params.id,
        ]
    );

    res.json({
        message: `Updated post at ${req.params.id} was successfully`,
    });
});

//** DELETE **/ //
postRouter.delete("/:id", async (req, res) => {
    await pool.query(
        `
    DELETE FROM posts WHERE post_id = $1
    `,
        [req.params.id]
    );

    return res.json({
        message: `Deleted post at ID ${req.params.id} was successfully`,
    });
});

export default postRouter;