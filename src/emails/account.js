const sgMail = require('@sendgrid/mail');

// const sendgridAPIKey = 'xxx'; // Moved to env variables file.

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name)=>{
  // This is aynchronous - send method returns a promise.
  sgMail.send({
    to: email,
    from: 'glynester@hotmail.com',
    subject: 'Welcome to the Task-Manager App ' + name,
    text: `Welcome to Task-Manager ${name}
    We hope you enjoy your stay.
    Thanks 
    The Task-Manager Team`
  })
}

const sendCancellationEmail = (email, name)=>{
  sgMail.send({
    to: email,
    from: 'glynester@hotmail.com',
    subject: 'Sorry to see you leave ' + name,
    text: `
    We're sorry you're leaving Task-Manager ${name}
    We hope you enjoyed your stay. 
    If there's anything we can do to improve the app, please let us know.
    Thanks 
    The Task-Manager Team`
  })
}

// sgMail.send({
//   to: 'glennbem@gmail.com',
//   from: 'glynester@hotmail.com',
//   subject: 'E-mail sent using Twilio Sendgrid and nodejs',
//   text: `The Sun is the star at the centre of the Solar System. It is a 
//   nearly perfect ball of hot plasma, heated to incandescence by nuclear 
//   fusion reactions in its core, radiating the energy mainly as visible 
//   light, ultraviolet light, and infrared radiation.`,
//   // html:      // Another property
// })


module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
}
