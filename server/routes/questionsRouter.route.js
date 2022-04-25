const router = require('express').Router()
const { Question } = require('../db/models')

router.route('/')
  .get(async (req, res) => {
    const questions = await Question.findAll({ raw: true })
    res.json({ questions })
  })

router.route('/:id')
  .post(async (req, res) => {
    const { id } = req.params
    const { answer } = req.body
    const question = await Question.findByPk(id, { raw: true })

    const post = (status, message, score) => {
      return {
        status,
        message,
        score
      }
    }

    if (question.question_answer.toLowerCase() === answer.toLowerCase()) {
      // const changeSatus = await Question.findByPk(id)
      // await changeSatus.update({ question_status: true })

      res.json(post(200, 'Правильный ответ!', question.question_score))
    } else {
      // const changeSatus = await Question.findByPk(id)
      // await changeSatus.update({ question_status: true })

      res.json(post(400, `Неверно, правильный ответ - ${question.question_answer}`, question.question_score))
    }
  })

module.exports = router
