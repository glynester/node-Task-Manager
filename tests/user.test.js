const request = require('supertest');

// We need the express app without calling "app.listen".
const app = require('../src/app');
const User=require('../src/models/user');
const userOne={
  name: "Sid",
  email: "sv@sx.com",
  password: "sv123XYZ",
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

test ('Should signup a new user',async ()=>{
  await request(app).post('/users').send({
    name: "Glenn",
    email: "gb@sx.com",
    password: "gb123XYZ",
  }).expect(201);
})

test('Should login existing user', async ()=>{
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);
})

test('Should not login non-existent user', async ()=>{
  await request(app).post('/users/login').send({
    email: "nonexistent@sx.com",
    password: "nonexistent",
  }).expect(400);
})