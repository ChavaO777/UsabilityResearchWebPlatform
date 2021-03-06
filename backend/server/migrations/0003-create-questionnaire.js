module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Questionnaires', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    isPublic: {
      type: Sequelize.BOOLEAN,
    },
    scaleSize: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    user_id: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Questionnaires'),
};
