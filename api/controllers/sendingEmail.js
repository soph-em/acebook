const Nodemailer = require("nodemailer");

const sendEmail = (email, username) => {
  const transporter = Nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'theacebookteam@gmail.com',
      pass: 'cwla nmqi zzlz tbip', //TesterAccountForAB
    }
  })

  const mailOptions = {
    from: "theacebookteam@gmail.com",
    to: email,
    subject: "Account Creation",
    text: "Hello " + username+ ",\nYou are receiving this email to confirm that your account has been successfully created with Acebook!\n\nThe Acebook Team.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
}

module.exports = sendEmail;