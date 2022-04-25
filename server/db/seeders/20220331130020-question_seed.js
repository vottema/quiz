'use strict';
const fs = require('fs').promises
const path = require('path')
const { Theme } = require('../models')

const themePath = path.join(process.env.PWD, 'themes')

module.exports = {
  async up (queryInterface, Sequelize) {

    const themes = await fs.readdir(themePath)
    const themesBD = await Theme.findAll({ raw: true })

    let questionSeed = []

    for (let i = 0; i < themesBD.length; i++) {
      if (themesBD[i].theme_title + '.txt' === themes[i]) {
        const questions = await fs.readFile(`${themePath}/${themes[i]}`, 'utf-8')
        const questionsArr = questions.split('\n')

        for (let j = 0; j < questionsArr.length; j += 3) {
          const questionsObj = {}
          questionsObj.theme_id = themesBD[i].id

          if (questionsArr[j] !== '') {
            questionsObj.question_name = questionsArr[j]
            questionsObj.question_answer = questionsArr[j + 1]
            questionsObj.question_score = questionsArr[j + 2]
            questionsObj.question_status = false
            questionsObj.createdAt = new Date()
            questionsObj.updatedAt = new Date()

            questionSeed.push(questionsObj)
          }
        }
      }
    }

    await queryInterface.bulkInsert('Questions', questionSeed, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {})
  }
};
