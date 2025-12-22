const nodemailer = require('nodemailer')
require('dotenv').config();

const USER_EMAIL = process.env.USER_EMAIL
const USER_PASS  = process.env.USER_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS // NOT your normal password
  }
})

exports.sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: 'Recuperação de Senha - Seu Código',
    html: `
      <h3>Recuperação de Senha requested</h3>
      <p>Você solicitou a redefinição de senha.</p>
      <p>Seu código de verificação é: <b>${token}</b></p>
      <p>Este código expira em 1 hora.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};