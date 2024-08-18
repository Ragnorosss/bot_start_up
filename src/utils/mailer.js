import nodemailer from 'nodemailer';

// Создайте транспорт для отправки писем
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Функция для отправки писем
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
