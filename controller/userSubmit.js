const PersonalInfo = require("../model/personalInfo");
const EmploymentHistory = require("../model/employmentHistory");
const Education = require("../model/education");
const Preferences = require("../model/preference");
const Skills = require("../model/skills");
const Agreement = require("../model/agreement");
const Reference = require("../model/reference");
const Desire = require("../model/desiredEmployment");
const CurrentEmployer = require("../model/currentEmployment");
const Files = require("../model/Attechment");
const cloudinary = require("../config/cloud");
const User = require("../model/allSchema");
const mongoose = require("mongoose");
const fs = require("fs").promises;

const applicationForm = async (req, res) => {
  try {
    const {
      personalInfo,
      desiredEmployment,
      education,
      preferences,
      skills,
      agreement,
      references,
      employmentHistory,
      currentEmployer,
    } = req.body;

    const fileUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const options = file.mimetype === "application/pdf"
          ? { resource_type: "raw", timeout: 60000 }
          : { timeout: 60000 };

        try {
          const uploadedFile = await cloudinary.uploader.upload(file.path, options);
          fileUrls.push(uploadedFile.secure_url);
          await fs.unlink(file.path);
        } catch (error) {
          if (error.code === "ECONNRESET") {
            console.error("Connection reset while uploading file:", file.path);
            res.status(500).json({ error: "File upload failed. Please try again later." });
            return;
          }
          throw error; // Re-throw other errors
        }
      }
    }

    const personalInfoDoc = await PersonalInfo.create(personalInfo);
    const desiredEmploymentDoc = await Desire.create(desiredEmployment);
    const educationDoc = await Education.create(education);
    const preferencesDoc = await Preferences.create(preferences);
    const skillsDoc = await Skills.create(skills);
    const agreementDoc = await Agreement.create(agreement);
    const referencesDoc = await Reference.create(references);
    const employmentHistoryDoc = await EmploymentHistory.create(employmentHistory);
    const currentEmployerDoc = await CurrentEmployer.create(currentEmployer);
    const filesDoc = await Files.create({ files: fileUrls });


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
      files: filesDoc._id,
    });

    const saveApplication = await userApplication.save();

    res.status(200).json({
      message: "Application submitted successfully",
      application: saveApplication,
    });
  } catch (error) {
    console.error("Error submitting application", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { applicationForm };
