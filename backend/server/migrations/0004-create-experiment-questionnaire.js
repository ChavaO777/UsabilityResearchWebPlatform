'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('experimentsQuestionnaires', {
      ExperimentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Experiments',
          key: 'id',
        },
      },
      QuestionnaireId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questionnaires',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('experimentsQuestionnaires');
  }
};