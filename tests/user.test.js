const request = require('supertest');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
// We need the express app without calling "app.listen".
const app = require('../src/app');
const User=require('../src/models/user');
// userOneId needed in more than one place.
const userOneId = new mongoose.Types.ObjectId();
const userOne={
  _id: userOneId,
  name: "Sid Xion",
  email: "sx@gleammail.com",
  password: "sx123XYZ",
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}
// Environment should be reset each time the test suite is run.
// Ensure users are gone before test runs.
beforeEach(async()=>{
  console.log("Before each has run");
  await User.deleteMany({});
  await new User(userOne).save();
})

// afterEach(()=>{
//   console.log("After each has run");
// })
//test('',async () => {})
test ('Should signup a new user',async ()=>{
  // await request(app).post('/users').send({ // Can assign to variable so we can look at body of response.
    const response=await request(app).post('/users').send({
    name: "Garth Burgess",
    email: "gb@gleammail.com",
    password: "gb123XYZ",
  }).expect(201);
  // Assert database changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();    // user saved to database
  // Assertions about response
  // expect(response.body.user.name).toBe('Glenn'); // expect has another assertion when using objects
  // Use "toMatchObject". Much better when there's an object to test.
  expect(response.body).toMatchObject({
    user: {
      name: "Garth Burgess",
      email: "gb@gleammail.com",
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe('gb123XYZ');
})

test('Should login existing user', async ()=>{
  const response=await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);
  const user=await User.findById(userOneId);
  expect(user).not.toBeNull();
  // expect(response.body.token).toBe(user.tokens[1].token);
  // Equivalent test below
  expect (response.body).toMatchObject({
    token: user.tokens[1].token
  })
})

test('Should not login non-existent user', async ()=>{
  await request(app).post('/users/login').send({
    email: "nonexistent@sx.com",
    password: "nonexistent",
  }).expect(400);
})

// Need to set authorisation header - done with "set"
test('Should get profile for user',async ()=>{
  await request(app).get('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
})

test('Should not get profile for unauthenticated user',async ()=>{
  await request(app).get('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token.replace(/\d/g,0)}`)
  .send()
  .expect(401); // auth middleware returns 401 error
})

test('Should delete account for user',async ()=>{
  await request(app).delete('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
})

test('Should not delete account for unauthenticated user', async ()=>{
  await request(app).delete('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token.replace(/\d/g,0)}`)
  .send()
  .expect(401);
})

// Supertest provides "attach" to attach files.
test('Should upload avatar image', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/image.jpg')
    .expect(200);
    const user = await User.findById(userOneId);
    // expect({}).toBe({});    // fails
    // expect({}).toEqual({});    // passes
    expect(user.avatar).toEqual(expect.any(Buffer));  // could check for String or Number, etc
})
// File location is from root of tests folder

test('Should update valid user fields', async()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send({name:"Johnson"});
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Johnson");
})

test('Should not update invalid user fields', async()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send({eyeColour: "Green"})
  .expect(400);
  const user = await User.findById(userOneId);
  expect(user.eyeColour).toBe(undefined);
})

