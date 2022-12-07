const nodemailer = require("nodemailer");
const sendEmailForgotPassword = async (email, link) => {

  const transporter = await nodemailer.createTransport({
    host: "mail.ibendouma.com",
    port: 465,
    secure: true,

    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let mailOptions = {
    from: "<service@ibendouma.com>",
    to: email,
    subject: "Hello from iBendouma",
    text: "Voici le lien de réinitialisation de votre mot de passe",
    html: `<b>copier le code et verifier votre identité</b>
        <div><p>Bienvenue sur iBendouma, </P>
        <p>Voici le lien de réinitialisation de votre mot de passe</p>
        <p>S'il vous plait ne lodonner à personne</p>
        <span style="color: #129af6">${link} </span>,
        <span> Ce lien vous permet de modifier votre mot de passe</span>
        </div>
    
    `, 
  };

  await transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email is sent", res);
    }
  });
};

module.exports = sendEmailForgotPassword;
