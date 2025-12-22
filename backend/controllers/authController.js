// controllers/authController.js
const crypto = require('crypto');
const User = require('../models/Usuario');
const emailService = require('../services/emailService');
const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for hashing

exports.esqueciSenha = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Security: Don't reveal if user exists or not
      return res.status(200).json({ message: 'Se o email existir, o código foi enviado.' });
    }

    // 1. Generate a random 6-digit code
    const token = crypto.randomInt(100000, 999999).toString();

    // 2. Set expiration (1 hour from now)
    const now = new Date();
    now.setHours(now.getHours() + 1);

    // 3. Save to DB
    await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: now
    });

    // 4. Send Email
    await emailService.sendResetEmail(email, token);

    res.status(200).json({ message: 'Email enviado com sucesso!' });

  } catch (error) {
    console.error("ERRO DETALHADO:", error);
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
};

exports.resetarSenha = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // 1. Find user with that email
    const user = await User.findOne({ where: { email } });

    // 2. Validate User, Token, and Expiration
    if (!user) {
        return res.status(400).json({ error: 'Usuário inválido' });
    }
    
    if (user.resetPasswordToken !== token) {
        return res.status(400).json({ error: 'Código inválido' });
    }

    if (new Date() > user.resetPasswordExpires) {
        return res.status(400).json({ error: 'Código expirado' });
    }

    // 4. Update Password and Clear Token
    await user.update({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    res.status(200).json({ message: 'Senha alterada com sucesso!' });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao resetar senha' });
  }
};