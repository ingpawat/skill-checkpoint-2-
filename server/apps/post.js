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
        ...req.body,
        published_at: new Date(),
    }

    const newQuestion = await collection.insertOne(questionData);

    console.log(newQuestion)

    return res.json({
        message: `Question ${newQuestion.insertId} has been added successfully`,
    })

});

post.post('/answer', async (req, res) => {
    const collection = db.collection("answer")

    const answerData = {
        ...req.body,
        published_at: new Date(),
    };

    const newAnswer = await collection.insertOne(answerData);

    console.log(newAnswer)

    return res.json({
        message: `Answer ${newAnswer.insertId} has been added successfully`,
    })

});

// * GET *

post.get('/', async (req, res) => {
    const collection = db.collection("forum");
    const questionData = await collection.find().sort({ published_at: -1 }).toArray();

    return res.json({
        data: questionData,
    })
});

post.get('/answer', async (req, res) => {
    const collection = db.collection("answer");
    const answerData = await collection.find().sort({ published_at: -1 }).toArray();

    return res.json({
        data: answerData,
    })
});


// * PUT *


// * DELETE *

// post.delete('/', async (req, res) => {
//     const collection = db.collection("forum")
//     const id = Number(req.params.questionId)
//     const questionId = collection.find(collection => collection.id === id)
//     const deleteQuestion = await collection.deleteOne(questionId);

//     console.log(deleteQuestion)

//     return res.json({
//         message: `Question ${deleteQuestion.insertId} has been deleted successfully`,
//     })
// });


// app.delete('/answer/:id', (req, res) => {
//     const id = Number(req.params.answerId)
    // const answer = answer.find(answer => answer.id === id)

//     if (!answer) {
//         return res.status(404).send('answer not found')
//     }

//     return res.json(answer)
// }); 