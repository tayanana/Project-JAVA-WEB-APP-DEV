const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send-report', async (req, res) => {
  const { recipientEmail, moodData, activityData, userEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // your Gmail app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `Mental Health Report from ${userEmail}`,
    html: `
      <h2>User Mood and Activity Report</h2>
      <p><strong>User:</strong> ${userEmail}</p>
      <p><strong>Mood Data:</strong> ${JSON.stringify(moodData, null, 2)}</p>
      <p><strong>Activity Data:</strong> ${JSON.stringify(activityData, null, 2)}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send report', error });
  }
});

module.exports = router;