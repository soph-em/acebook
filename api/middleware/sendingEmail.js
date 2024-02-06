const nodemailer = require('nodemailer');

async function sendEmail(email, username) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'theacebookteam@gmail.com',
      pass: '2869', //TesterAccountForAB
    }
  })

  const mailOptions = {
    from: "theacebookteam@gmail.com",
    to: email,
    subject: "Account Creation",
    text: "Hello " + username+ ",\nYou are receiving this email to confirm that your account has been successfully created with Acebook!\n\nThe Acebook Team.",
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default sendEmail;