const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'TONEMAIL@gmail.com',
    pass: 'MOT_DE_PASSE_APP'
  }
});

app.post('/send-tool', async (req, res) => {
  const { email, name } = req.body;

  try {
    await transporter.sendMail({
      from: 'VIOLET Tool <TONEMAIL@gmail.com>',
      to: email,
      subject: 'Votre VIOLET Tool',
      text: `Bonjour ${name}, merci pour votre achat.`,
      attachments: [
        { filename: 'VIOLET_Tool.zip', path: './tool.zip' }
      ]
    });

    res.send('Email envoyé');
  } catch (e) {
    res.status(500).send('Erreur');
  }
});

app.listen(3000, () => console.log('Serveur OK'));
