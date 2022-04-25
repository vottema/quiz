'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      theme_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Themes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      question_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      question_answer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      question_score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      question_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
