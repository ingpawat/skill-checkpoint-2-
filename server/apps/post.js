import { Router } from "express";
import { db } from "../utils/db.js";
import question from "../data/question.js"
import answer from "../data/answer.js"

export const post = Router();

const questionData = question;
const answerData = answer;

// * POST *

post.post('/', async (req, res) => {
    const collection = db.collection("forum")

    const questionData = {
        ...req.body
    }

    const newQuestion =  await collection.insertOne(questionData);

    console.log(newQuestion)

    return res.json({
        message: "Question has been added successfully",
    })

});

post.post('/answer', async (req, res) => {
    const collection = db.collection("answer")

    const answerData = {
        ...req.body
    }

    const newAnswer =  await collection.insertOne(answerData);

    console.log(newAnswer)

    return res.json({
        message: "Answer has been added successfully",
    })

});

// * GET *

post.get('/', (req, res) => {
    return res.json({
        data: questionData,
    })
});

post.get('/answer', (req, res) => {
    return res.json({
        data: answerData,
    })
});


