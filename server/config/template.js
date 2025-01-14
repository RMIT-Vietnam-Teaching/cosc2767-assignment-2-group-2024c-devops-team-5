// Template for reset password email
export const resetEmail = (host, resetToken) => ({
  subject: 'Reset Password',
  text:
    `${'You are receiving this because you have requested to reset your password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://'
    }${host}/reset-password/${resetToken}\n\n` +
    `If you did not request this, please ignore this email and your password will remain unchanged.\n`
});

export const confirmResetPasswordEmail = () => ({
  subject: 'Password Changed',
  text:
    `You are receiving this email because you changed your password. \n\n` +
    `If you did not request this change, please contact us immediately.`
});

// Template for merchant signup email
export const merchantSignup = (host, { resetToken, email }) => ({
  subject: 'Merchant Registration',
  text: `${'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://'
    }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
});

// Template for welcoming new merchant
export const merchantWelcome = name => ({
  subject: 'Merchant Registration',
  text:
    `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
    `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
});

// Template for user signup email
export const signupEmail = name => ({
  subject: 'Account Registration',
  text: `Hi ${name.firstName} ${name.lastName}! Thank you for creating an account with us!.`
});

// Template for newsletter subscription confirmation email
export const newsletterSubscriptionEmail = () => ({
  subject: 'Newsletter Subscription',
  text:
    `You are receiving this email because you subscribed to our newsletter. \n\n` +
    `If you did not request this change, please contact us immediately.`
});

// Template for contact us email
export const contactEmail = () => ({
  subject: 'Contact Us',
  text: `We received your message! Our team will contact you soon. \n\n`
});

// Template for merchant application email
export const merchantApplicationEmail = () => ({
  subject: 'Sell on MERN Store',
  text: `We received your request! Our team will contact you soon. \n\n`
});

// Template for merchant account deactivation email
export const merchantDeactivateAccount = () => ({
  subject: 'Merchant account on MERN Store',
  text:
    `Your merchant account has been disabled. \n\n` +
    `Please contact admin to request access again.`
});

// Template for order confirmation email
export const orderConfirmationEmail = order => ({
  subject: `Order Confirmation ${order._id}`,
  text:
    `Hi ${order.user.profile.firstName}! Thank you for your order!. \n\n` +
    `We've received your order and will contact you as soon as your package is shipped. \n\n`
});

export default {
  resetEmail,
  confirmResetPasswordEmail,
  merchantSignup,
  merchantWelcome,
  signupEmail,
  newsletterSubscriptionEmail,
  contactEmail,
  merchantApplicationEmail,
  merchantDeactivateAccount,
  orderConfirmationEmail
};
