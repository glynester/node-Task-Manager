const request= require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const User = require('../src/models/user');
const { 
  userOneId, 
  userOne, 
  userTwoId, 
  userTwo, 
  taskOne,
  taskTwo, 
  taskThree, 
  setupDatabase 
} = require('./fixtures/db');

beforeEach(
  setupDatabase
)
// Jest tries to run different test suites at the same time, so keep data for users and task separate.
// --runInBand (package.json)- makes tests run in series so no conflicts.
// fixtures/db.js for setting up database
test('Should create task for user',async()=>{
  const response = await request(app)
  .post('/tasks')
  .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
  .send({
    description: "Test task"
  })
  .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.description).toBe('Test task');
  expect(task.completed).toBe(false);
})

test('Retrieve all tasks for a user',async()=>{
  const response = await request(app)
  .get('/tasks')
  .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  const tasks = response.body;
  // console.log("response=>",response.body);
  expect (tasks).toHaveLength(2); 
  // expect(response.body.length).toEqual(2); // Equivalent
})


test('User can delete task',async()=>{
  // console.log("taskOne=>",taskOne);
  const response = await request(app)
  .delete('/tasks/'+taskOne._id)
  .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
  // Alternative equivalent
  const tasks = await Task.find({
    owner: userOneId
  });
  expect (tasks).toHaveLength(1); // 1 task deleted
})

test("User can't delete other user's tasks",async()=>{
  const response = await request(app)
  .delete('/tasks/'+taskThree._id)
  .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(404);
  const task = await Task.findById(taskThree._id);
  expect(task).not.toBeNull();
  // Alternative equivalent
  const tasks = await Task.find({ 
    owner: userTwoId
  });
  expect (tasks).toHaveLength(1);  // Nothing deleted. 
})

// Other tests to create:
//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
