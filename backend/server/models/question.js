
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    initialImage: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    finalImage: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    initialSound: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    finalSound: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {});
  Question.associate = (models) => {
    Question.belongsToMany(models.Questionnaire, { through: 'QuestionQuestionnaire' });
  };

  return Question;
};
