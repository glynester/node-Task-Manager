// https://jestjs.io/docs/manual-mocks#mocking-node-modules
// We are essentially mocking the route below which is on emails/account.js:
// const sgMail = require('@sendgrid/mail');
// Create a folder "@sendgrid" with a file "mail" inside it.

// On emails/account.js, sgMail is imported.
// Effectively sgMail exports an object with these properties:
// 1) setApiKey
// 2) send
// Just look for the number of times "sgMail.a_function()" is called to get the names of the functions that need to be mocked.

// Therefore we need to create mocks (empty functions) for these functions and export them

module.exports= {
  setApiKey(){console.log("Mock API Key set")},
  send(){console.log("Mock email sent")},
}
// Be aware of return value of a mocked function - in this case they don't return anything so we don't need to worry (or return anything).

// When mocking a module, you must provide everything that that module needs in order to work.
// Mocking folders for Jest need to be inside "__mocks__" for them to takeover from the real functions.



