const { Questionnaire, QuestionnaireQuestion } = require('../models');

module.exports = {
  create(req, res) {
    if (!req.body.name) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "name" of an instance of "Questionnaire" cannot be empty.',
      });
    }
    if (!req.body.description) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "description" of an instance of "Questionnaire" cannot be empty.',
      });
    }
    if (!req.body.isPublic) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "isPublic" of an instance of "Questionnaire" cannot be empty.',
      });
    }
    if (!req.body.scaleSize) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "scaleSize" of an instance of "Questionnaire" cannot be empty.',
      });
    }
    if (!req.body.user_id && req.body.isPublic === false) {
      return res.status(400).send({
        status: 400,
        message: 'A "Questionnaire" instance that does not belong to a user must be public.',
      });
    }

    return Questionnaire
      .create({
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
        isPublic: req.body.isPublic,
        scaleSize: req.body.scaleSize,
      })
      .then(questionnaire => res.status(201).send(questionnaire))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Questionnaire
      .findAll()
      .then(questionnaires => res.status(200).send(questionnaires))
      .catch(error => res.status(400).send(error));
  },

  listByUser(req) {
    return Questionnaire
      .findAll({
        where: {
          experiment_id: req.body.experiment_id,
        },
      });
  },

  retrieve(req, res) {
    return Questionnaire
      .findById(req.params.id, {
        include: [{
          model: QuestionnaireQuestion,
          as: 'questions',
          required: false,
        }],
      })
      .then((questionnaire) => {
        if (!questionnaire) {
          return res.status(404).send({
            status: 400,
            message: 'No questionnaire with that ID was found.',
          });
        }
        return res.status(200).send(questionnaire);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Questionnaire
      .findById(req.params.id, {
      })
      .then((questionnaire) => {
        if (!questionnaire) {
          return res.status(404).send({
            status: 400,
            message: 'No questionnaire with that ID was found.',
          });
        }
        return questionnaire
          .update({
            name: req.body.name || questionnaire.name,
            description: req.body.description || questionnaire.description,
            isPublic: req.body.isPublic || questionnaire.isPublic,
            scaleSize: req.body.scaleSize || questionnaire.scaleSize,
            user_id: req.body.user_id || questionnaire.user_id,
          })
          .then(updatedQuestionnaire => res.status(200).send(updatedQuestionnaire))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Questionnaire
      .findById(req.params.id, {
      })
      .then((questionnaire) => {
        if (!questionnaire) {
          return res.status(400).send({
            status: 400,
            message: 'No questionnaire with that ID was found.',
          });
        }

        return questionnaire
          .destroy()
          .then(() => res.status(200).send({
            status: 200,
            message: 'Questionnaire deleted.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
