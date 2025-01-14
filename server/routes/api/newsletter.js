import express from 'express';
const router = express.Router();

import mailchimp from '../../services/mailchimp.js';
import mailgun from '../../services/mailgun.js';

router.post('/subscribe', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'You must enter an email address.' });
  }

  // Email notification logic is a work in progress, ignore this for now
  const result = await mailchimp.subscribeToNewsletter(email);

  if (result.status === 400) {
    return res.status(400).json({ error: result.title });
  }

  // Email notification logic is a work in progress, ignore this for now
  await mailgun.sendEmail(email, 'newsletter-subscription');

  res.status(200).json({
    success: true,
    message: 'You have successfully subscribed to the newsletter'
  });
});

export default router;
