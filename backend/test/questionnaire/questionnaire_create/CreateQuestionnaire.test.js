const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaire', () => {
  it('POST /questionnaires/ must create a questionnaire.', async () => {
    const createQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        user_id: 'danperez@gmail.com',
        isPublic: 'true',
        scaleSize: '3',
      }),
    });

    const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();
    const newQuestionnaireId = createQuestionnaireResponseJson.id;
    expect(createQuestionnaireResponseJson.name).to.be.equal('Test name');
    expect(createQuestionnaireResponseJson.description).to.be.equal('Test description');
    expect(createQuestionnaireResponseJson.user_id).to.be.equal('danperez@gmail.com');
    expect(createQuestionnaireResponseJson.isPublic).to.be.equal(true);
    expect(createQuestionnaireResponseJson.scaleSize).to.be.equal(3);

    const deleteQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/${newQuestionnaireId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteQuestionnaireResponseJson = await deleteQuestionnaireResponse.json();
    expect(deleteQuestionnaireResponseJson.status).to.be.equal(200);
  });
});
