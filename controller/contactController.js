const { conactValidation } = require("../middleware/joiValidation");
const createTransporter = require("../middleware/emailSetup");
const ejs = require("ejs");
const path = require("path");
const contactModelSchema = require("../model/contactModel");

const contactMail = async (req, res) => {
    try {
      const { error } = conactValidation(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { firstName, email, address, subject, message } = req.body;
  
      const newContact = new contactModelSchema({
        firstName,
        email,
        address,
        subject,
        message,
      });
      await newContact.save();
      const transporter = await createTransporter();
  
      const htmlContent = await ejs.renderFile(
        path.join(__dirname, "../views/email/emailTemplate.ejs"),
        {
          firstName,
          email,
          address,
          subject,
          message,
        }
      );
  
      const mailOption = {
        from: ` ${email} <ebukajude14@gmail.com>`,
        to: process.env.RECEIVER_EMAIL,
        subject: `New message from ${firstName} - ${subject}`,
        html: htmlContent,
      };
  
      await transporter.sendMail(mailOption);
  
      res
        .status(200)
        .json({ message: "Contact saved and email sent successfully" });
    } catch (error) {
      console.error("Error details:", error);
      res
        .status(500)
        .json({ error: "Failed to send email", details: error.message });
    }
  };
  
  
  
  
  module.exports = { contactMail};