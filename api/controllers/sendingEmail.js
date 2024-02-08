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
    from: "Acebook Team <theacebookteam@gmail.com>",
    to: email,
    subject: "Account Creation",
    html: '<h1>Welcome To Acebook!</h1><p>Hello '+username+',</p><p>Congratulations, you have successfully signed up for acebook! We are thrilled you have joined our community.</p><p>With your acebook account, you can now connect with friends, family, and others who share your interests. Build your profile, share updates, photos, videos, and more.</p><p> On behalf of the entire acebook team, welcome! We can’t wait to see you around. Let us know if you have any other questions as you get started.</p><p>Best Regards,</p><p>The Acebook Team</p>',
    //text: "Hello " + username+ ",\n\nYou are receiving this email to confirm that your account has been successfully created with Acebook!\n\nThe Acebook Team.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
}

module.exports = sendEmail;