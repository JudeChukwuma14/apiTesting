const PersonalInfo = require("../model/personalInfo");
const EmploymentHistory = require("../model/employmentHistory");
const Education = require("../model/education");
const Preferences = require("../model/preference");
const Skills = require("../model/skills");
const Agreement = require("../model/agreement");
const Reference = require("../model/reference");
const Desire = require("../model/desiredEmployment");
const CurrentEmployer = require("../model/currentEmployment");
const EmergencyContact = require("../model/emergencyContact");
const Certify = require("../model/certification");
const Images = require("../model/Attechment");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/allSchema");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const createTransporter = require("../middleware/emailSetup");
const qs = require("qs");

const applicationForm = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);

    if (!req.files) {
      return res.status(400).json({
        message: "Please upload an image",
        success: false,
      });
    }
    const images = req.files.images;
    if (!Array.isArray(images)) {
      return res.status(400).json({
        message: "Please upload multiple images",
        success: false,
      });
    }
    const hostname = `${req.protocol}://${req.get("host")}`;
    let imageArray = [];
    await Promise.all(
      images.map(async (item) => {
        const imageID = uuidv4();
        const imageExtension = item.name.split(".").pop();
        const newImageName = `${imageID}.${imageExtension}`;
        const imagePath = `${hostname}/public/uploads/${newImageName}`;
        imageArray.push(imagePath);
        const imageDr = `public/uploads/${newImageName}`;
        await item.mv(imageDr);
      })
    );

    const parsedBody = qs.parse(req.body);

    const {
      personalInfo,
      desiredEmployment,
      education,
      preferences,
      skills,
      agreement,
      references,
      employmentHistory,
      emergencyContact,
      currentEmployer,
      certify
    } = parsedBody;

    console.log("Parsed Data:", {
      personalInfo,
      desiredEmployment,
      education,
      preferences,
      skills,
      agreement,
      references,
      employmentHistory,
      emergencyContact,
      currentEmployer,
      certify
    });

    const personalInfoDoc = await PersonalInfo.create(personalInfo);
    const desiredEmploymentDoc = await Desire.create(desiredEmployment);
    const educationDoc = await Education.create(education);
    const preferencesDoc = await Preferences.create(preferences);
    const skillsDoc = await Skills.create(skills);
    const agreementDoc = await Agreement.create(agreement);
    const referencesDoc = await Reference.create(references);
    const employmentHistoryDoc = await EmploymentHistory.create(
      employmentHistory
    );
    const emergencyContactDoc = await EmergencyContact.create(emergencyContact);
    const certifyDoc = await Certify.create(certify);
    const currentEmployerDoc = await CurrentEmployer.create(currentEmployer);
    const imagesDoc = await Images.create({ images: imageArray });

    console.log("Created Documents:", {
      personalInfoDoc,
      desiredEmploymentDoc,
      educationDoc,
      preferencesDoc,
      skillsDoc,
      agreementDoc,
      referencesDoc,
      employmentHistoryDoc,
      emergencyContactDoc,
      currentEmployerDoc,
      imagesDoc,
    });

    const userApplication = new User({
      personalInfo: personalInfoDoc._id,
      desiredEmployment: desiredEmploymentDoc._id,
      education: educationDoc._id,
      currentEmployer: currentEmployerDoc._id,
      preferences: preferencesDoc._id,
      skills: skillsDoc._id,
      agreement: agreementDoc._id,
      references: referencesDoc._id,
      employmentHistory: employmentHistoryDoc._id,
      emergencycontact: emergencyContactDoc._id,
      certify: certifyDoc._id,
      images: imagesDoc._id,
    });

    const saveApplication = await userApplication.save();
    const populatedApplication = await User.findById(saveApplication._id)
      .populate("personalInfo")
      .populate("desiredEmployment")
      .populate("education")
      .populate("currentEmployer")
      .populate("preferences")
      .populate("skills")
      .populate("agreement")
      .populate("references")
      .populate("employmentHistory")
      .populate("certify")
      .populate("emergencycontact")
      .populate("images");

    // console.log("Populated Application:", populatedApplication);

    const transporter = await createTransporter();
    const eamilData = {
      personalInfo: populatedApplication.personalInfo,
      desiredEmployment: populatedApplication.desiredEmployment,
      education: populatedApplication.education,
      currentEmployer: populatedApplication.currentEmployer,
      preferences: populatedApplication.preferences,
      skills: populatedApplication.skills,
      agreement: populatedApplication.agreement,
      references: populatedApplication.references,
      emergencycontact: populatedApplication.emergencycontact,
      certify: populatedApplication.certify,
      images: populatedApplication.images,
      employmentHistory: populatedApplication.employmentHistory, // Add this line
    };
    // console.log(eamilData.personalInfo);

    const htmlContent = await new Promise((resolve, reject) => {
      res.render("emailMess", eamilData, (err, html) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          return reject(err);
        }
        resolve(html);
      });
    });

    const mailOptions = {
      from: `$Application Bot: <ebukajude14@gmail.com>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "New message from",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Application submitted successfully",
      application: saveApplication,
    });
  } catch (error) {
    console.error("Error submitting application", error.message);
    res.status(500).json({ error: "Server error", error: error });
  }
};

module.exports = { applicationForm };