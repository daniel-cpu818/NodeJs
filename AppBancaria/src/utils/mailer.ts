import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT!),
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


export const sendWelcomeEmail = async (to: string, name: string, account: string) => {
  const html = pug.renderFile(path.join(__dirname, '../views/welcome.pug'), {
    name,
    account,
  });

  await transporter.sendMail({
    from: `"Banco App" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Bienvenido a tu cuenta bancaria',
    html,
  });
};


export const sendTransferEmail = async (to: string, amount: number, sender: string) => {
  const html = pug.renderFile(path.join(__dirname, '../views/transfer.pug'), {
    amount,
    sender,
    date: new Date().toLocaleString(),
  });

  await transporter.sendMail({
    from: `"Banco App" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Has recibido una transferencia',
    html,
  });
};
