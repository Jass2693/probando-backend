const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importa el middleware cors

// desabilitar certificado
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Usa cors como middleware

// Configuración de nodemailer (debes ingresar tus propios datos)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jass2693@gmail.com', // tu dirección de correo
    pass: 'szwc rvza rgns qvac', // tu contraseña
  },
});

app.post('/api/contacto', (req, res) => {
  const { userName, userLastName, userEmail,asunto, message  } = req.body;

  // Configuración del correo electrónico
  const mailOptions = {
    from: userEmail,
    to: 'jass2693@gmail.com',
    subject: asunto,
    text: `Nombre: ${userName}\nEmail: ${userEmail}\nMensaje: ${message} `,
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al enviar el correo electrónico' });
    } else {
      console.log('Correo electrónico enviado: ' + info.response );
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});