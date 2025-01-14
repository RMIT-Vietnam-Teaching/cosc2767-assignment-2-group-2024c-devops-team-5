import Mailchimp from 'mailchimp-api-v3';
import keys from '../config/keys.js';

const { key, listKey } = keys.mailchimp;

class MailchimpService {
  init() {
    try {
      return new Mailchimp(key);
    } catch (error) {

    }
  }
}

const mailchimp = new MailchimpService().init();

export const subscribeToNewsletter = async email => {
  try {
    return await mailchimp.post(`lists/${listKey}/members`, {
      email_address: email,
      status: 'subscribed'
    });
  } catch (error) {
    return error;
  }
};

export default mailchimp;