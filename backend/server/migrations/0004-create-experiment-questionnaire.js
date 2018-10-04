'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExperimentQuestionnaire', {
      experiment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Experiments',
          key: 'id',
          as: 'experiment_id',
        },
      },
      questionnaire_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questionnaires',
          key: 'id',
          as: 'questionnaire_id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExperimentQuestionnaire');
  }
};