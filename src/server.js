const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Your desired port

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { toEmail, subject, body } = req.body;

  // Create a Nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service provider
    auth: {
        user: 'sewwandidarshani95@gmail.com',
        pass: 'nxkh uins swso fxqu',
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'sewwandidarshani95@gmail.com', // sender address
    to: toEmail, // list of receivers
    subject: subject, //'High Greenhouse Temperature Alert', // Subject line
    text: body// `The greenhouse temperature is high (${temperature}°C). Please ventilation system may be activated to cool the greenhouse.`
};

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});