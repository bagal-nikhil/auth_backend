const nodemailer = require("nodemailer");
const conf = require("../../conf/conf.json")
const path = require("path")
const fs = require("fs")
const hbs = require("hbs")

function renderTemplate(templateName, data = {}) {
  const filePath = path.join(__dirname, `../templates/${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf-8");
  const compiledTemplate = hbs.compile(source);
  return compiledTemplate(data);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikhilbagal330@gmail.com",
    pass: "mxkgqlydddwinysk",
  },
});

const sendEmail = async (to, subject, templateName, data) => {
  console.log(templateName)
  const htmlContent = renderTemplate(templateName, data);
  const mailOptions = {
    from: conf.email,
    to,
    subject,
    html: htmlContent,
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
