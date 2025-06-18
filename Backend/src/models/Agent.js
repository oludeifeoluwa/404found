const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const AgentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide a username"],
      trim: true,
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [50, "username cannott be more than 50 characters"],
      unique: true,
    },
    name: {
      type: String,
      minlength: [3, "name cannnot be less than 3 characters"],
      maxlength: [50, "name cannot be more than 50 characters"],
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "must provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "must provide password"],
      minlength: [
        3,
        "password cannot be less than 3 characters for security reasons",
      ],
    },
    agencyName: {
      type: String,
      minlength: [2, "name of agency cannnot be less than 2 characters"],
      maxlength: [50, "name cannot be more than 50 characters"],
      required: [true, "name of agency is required"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "must provide contact info"],
      validate: {
        validator: function (v) {
          return /^\d{11,20}$/.test(v);
        },
        message: "Contact must be between 11 to 20 digits",
      },
    },
    role: {
      type: String,
      enum: ["agent", "admin"],
      default: "agent",
    },
    agentImage: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    city: {
      type: String,  
      required: [true, "City is required"],
    },
    state: {
      type: String,
      enum: [
        "Abuja",
        "Lagos",
        "Edo",
        "Ogun",
        "Oyo",
        "Imo",
        "Anambara",
        "Rivers",
        "Enugu",
        "Kaduna",
        "Kwara",
        "Nasarawa",
        "Abia",
        "Delta",
        "Akwa Ibom",
        "Osun",
        "Ekiti",
        "Cross River",
        "Kogi",
        "Plateau",
        "Kano",
        "Katsina",
        "Bayelsa",
        "Borno",
        "Niger",
      ],
      required: [true, "State is required"],
    },
    experience: {
      type: Number,
      default: 0,
    },
    whatsapp: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^\d{11,20}$/.test(v);
        },
        message: "WhatsApp number must be between 11 to 20 digits",
      },
    },
    areasCovered: {
      type: [String],
      default: [],
    },
    socialMedia: {
      instagram: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },
    verificationToken: {
      type: String,
    },
    verified: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },

    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
    verificationTokenExpires: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  { timestamps: true }
);

AgentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
AgentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Agent", AgentSchema);
