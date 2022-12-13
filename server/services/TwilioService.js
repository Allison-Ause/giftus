import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Allie on Twilio',
    from: '+19518485438',
    to: '+19712355385',
  })
  .then((message) => console.log(message.sid))
  .catch((error) => {
    console.log(error);
    throw error;
  });

// client.messages
//   .create({
//     body:
//       'Heya, Allison! Reminder: Kylo has a 26th birthday coming up on December 13th.',
//     to: '+19712355385',
//     from: '+19518485438',
//   })
//   .then(console.log('successfully sent message'));

// (message) => console.log('Firing!', message.sid)
