'use strict';
const fs = require('fs').promises
const path = require('path')

const themePath = path.join(process.env.PWD, 'themes')

module.exports = {
  async up (queryInterface, Sequelize) {

    const themes = await fs.readdir(themePath)

    for (let i = 0; i < themes.length; i++) {
      await queryInterface.bulkInsert('Themes', [{
        theme_title: themes[i].slice(0, -4),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    }

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Themes', null, {})
  }
};
