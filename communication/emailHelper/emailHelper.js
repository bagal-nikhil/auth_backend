const nodemailer = require("nodemailer");
const conf = require("../../conf/conf.json")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikhilbagal330@gmail.com",
    pass: "mxkgqlydddwinysk",
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: conf.email,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

module.exports = sendEmail;
