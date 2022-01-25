// "test": "jest --watch",   <= Chnage in package.json to have jest running all the time.

const {calculateTip,fahrenheitToCelsius, 
  celsiusToFahrenheit, add}=require('../src/math');
// https://jestjs.io/docs/expect
// test('Should calculate total with tip',()=>{
//   const total = calculateTip(10,.3);
//   // if (total!==13){
//   //   throw new Error('Total tip should be 13 but got '+total)
//   // }
//   // Jest comes with assertion library
//   expect(total).toBe(13);
// })

// test('Should apply default tip %',()=>{
//   const total = calculateTip(10);
//   expect(total).toBe(12.5);
// }) 

test("Should convert 32 F to 0 C",()=>{
  const temp=fahrenheitToCelsius(32);
  expect(temp).toBe(0);
})

test("Should convert 0 C to 32 F",()=>{
  const temp=celsiusToFahrenheit(0);
  expect(temp).toBe(32);
})

// // 1) Use done for async code
// test('Should add 2 numbers',(done)=>{
//   add(2,3).then((sum)=>{    // add returns a promise
//     expect(sum).toBe(5);
//     done();
//   })
// })

// // 2) Use async/await for async code - better method.
// test('Should add 2 numbers - async/await', async()=>{
//   const sum=await add(9,8);
//   expect(sum).toBe(17);
// })

// Adding a fake "done" makes this asynchronous. 
// The correct result is now returned. <= Actually no working - I'm geting an error msg "Exceeded timeout of 5000 ms for a test."
// test('Async test demo', (done)=>{
//   setTimeout(()=>{
//     expect(1).toBe(2);
//     done();
//   },2000)
// })
// This test won't fail.
// test('Async test demo', ()=>{
//   setTimeout(()=>{
//     expect(1).toBe(2);
//   },2000)
// })



// test('',()=>{})  // test function provided globally
// Failure if test case throws an error. Success otherwise.
// test('This will pass!',()=>{

// })

// test('This will fail!',()=>{
//   throw new Error("Test failed!!!");
// })



// Why Test:
// Saves time.
// Creates reliable software
// Gives flexibility to developers
//  - refactoring
//  - collaborating
//  - profiling (seeing if things speed up or slow down)
// Peace of mind