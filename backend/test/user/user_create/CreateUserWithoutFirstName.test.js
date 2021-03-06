const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateUserWithoutFirstName', () => {
  it('POST /users/ without a field "firstName" must not create a user.', async () => {
    const createUserResponse = await fetch(`${SERVER}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'name@mail.com',
        lastName: 'Last name',
        password: 'secret',
      }),
    });

    const createUserResponseJson = await createUserResponse.json();
    expect(createUserResponseJson.status).to.be.equal(400);
    expect(createUserResponseJson.message).to.be.equal('The attribute "firstName" of an instance of "User" cannot be empty.');
  });
});
