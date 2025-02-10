import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILGUN_SMTP_USER,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

// Send password reset email
export async function sendResetEmail(to: string, resetToken: string) {
  // Get correct frontend URL
  const frontendUrl = process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_DEV;

  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `Ecommerce App <${process.env.MAILGUN_SMTP_USER}>`,
    to,
    subject: 'Password Reset Request',
    html: `
      <p>We received a password reset request.</p>
      <p>Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>
      <p>This link expires in 1 hour.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset email');
  }
}