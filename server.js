const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send notification email function
const sendNotificationEmail = async (message) => {
  try {
    console.log("message", message)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nurzanovazarina1@gmail.com',
        pass: 'rzdgcconjnlcedmb'
      }
    });

    const mailOptions = {
      from: 'nurzanovazarina1@gmail.com',
      to: "sultok.003@gmail.com",
      subject: 'Project Notification',
      text: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error; // Re-throw the error to handle it properly
  }
};

// Route to handle form submission
app.post('/send-email', async (req, res) => {
  const { email, phoneNumber } = req.body;
  const message = `Email: ${email}\nPhone Number: ${phoneNumber}`;

  try {
    await sendNotificationEmail(message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
