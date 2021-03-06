const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateAllPossibleFieldsOfExistingQuestionnaireQuestion', () => {
  it('PUT /questionnairequestions/:id with a valid id and a body containing all fields that can be updated must update each of those fields of a questionnaire question.', async () => {
    const createQuestionResponse = await fetch(`${SERVER}/questionnairequestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Test text',
        questionnaire_id: '2',
      }),
    });

    const createQuestionResponseJson = await createQuestionResponse.json();
    const newQuestionId = createQuestionResponseJson.id;
    expect(createQuestionResponseJson.text).to.be.equal('Test text');
    expect(createQuestionResponseJson.questionnaire_id).to.be.equal(2);

    const updateQuestionResponse = await fetch(`${SERVER}/questionnairequestions/${newQuestionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Test text 2',
        questionnaire_id: '1',
      }),
    });

    const updateQuestionResponseJson = await updateQuestionResponse.json();
    expect(updateQuestionResponseJson.text).to.be.equal('Test text 2');
    expect(updateQuestionResponseJson.questionnaire_id).to.be.equal('1');

    const deleteQuestionResponse = await fetch(`${SERVER}/questionnairequestions/${newQuestionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteQuestionResponseJson = await deleteQuestionResponse.json();
    expect(deleteQuestionResponseJson.status).to.be.equal(200);
  });
});
