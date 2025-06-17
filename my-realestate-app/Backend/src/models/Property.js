const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  //Basic info
  title: {
    type: String,
    trim: true,
    required: [true, "Property title is required"],
  },
  description:{
    type: String,
    trim: true,
    required: [true, "description is required"],
  },
  type: {
    type: String,
    enum: ["apartment", "detached house", "duplex", "land", "commercial"],
    required: [true, "Property type is required"],
  },
  listingType: {
    type: String,
    enum: ["sale", "rent", "lease"],
    required: [true, "Listing type is required"],
  },
  price: {
    type: Number,
    required: [true, "Property Price is required"],
  },
  currency: {
    type: String,
    enum: ["NGN", "USD", "EUR", "GBP"],
    default: "NGN",
  },
  availabilityStatus: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available",
  },
  // location details
  address: {
    type: String,
    required: [true, "must provide the property's address"],
  },
  city: {
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
      "Lekki",
      "Plateau",
      "Kano",
      "Katsina",
      "Bayelsa",
      "Borno",
      "Niger",
    ],
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  country: {
    type: String,
    default: "Nigeria",
  },
  paidBy: {
    id: { type: mongoose.Types.ObjectId, refPath: "paidBy.role" },
    role: {
      type: String,
      enum: ["user", "agent"],
    },
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },

  // Property Features
  bedrooms: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number, // store as number, assume square meters
    required: false,
  },
  floors: {
    type: Number,
    default: 1,
  },
  furnishingStatus: {
    type: String,
    enum: ["furnished", "unfurnished", "semi-furnished"],
    default: "unfurnished",
  },
  parkingSpaces: {
    type: Number,
    default: 0,
  },
  yearBuilt: {
    type: Number,
  },
  features: {
    flooring: { type: String },
    roofing: { type: String },
    airConditioning: { type: Boolean, default: false },
    generator: { type: Boolean, default: false },
    waterHeater: { type: Boolean, default: false },
    // Add more features here when IFE thw PM says so
  },
  images: {
    type: [String], // array of image URL
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: [true, "must be registered as an agent"],
  },
});
module.exports = mongoose.model("Property", PropertySchema);
