const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

const replaceContent = (content, creds) => {
  let allKeysArr = Object.keys(creds);
  allKeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
};

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");

    const emailDetails = {
      to: receiverEmail,
      from: "shashwatbagaria5@gmail.com",
      subject: "Mail from Scaler Movies",
      html: replaceContent(content, creds),
    };

    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };

    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
  } catch (err) {
    console.log(err);
  }
}


module.exports = EmailHelper;