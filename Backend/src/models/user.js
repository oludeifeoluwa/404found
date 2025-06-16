const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
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
    required: [true, "must provide first name"],
    trim: true,
    minlength: [3, "first name must be at least 3 characters"],
    maxlength: [50, "first name cant be more than 50 characters"],
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
    enum: ["admin", "user", "agent"],
    default: "user",
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
});

// Pre-save hook to hash password and generate full name
UserSchema.pre("save", async function () {
    // Password hashing
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Full name generation
  const nameParts = [this.firstName, this.middleName, this.lastName].filter(Boolean);
  this.name = nameParts.join(" ");
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
