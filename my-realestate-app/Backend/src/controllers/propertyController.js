const Property = require("../models/Property");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const checkAgentPermissions = require("../utils/checkAgentPermissions");

const createProperty = async (req, res) => {
  req.body.agent = req.user.agentId;
  const property = await Property.create(req.body);
  res.status(StatusCodes.CREATED).json({ property });
};
const getSingleProperty = async (req, res) => {
  const { id: propertyId } = req.params;
  const property = await Property.findOne({ _id: propertyId }).populate({
    path: "agent",
    select: "name email agencyName contact",
  });
  if (!property) {
    throw new CustomError.NotFoundError(
      `no property with id ${propertyId} found`
    );
  }
  res.status(StatusCodes.OK).json({ property });
};
const getAllProperties = async (req, res) => {
  const property = await Property.find({}).populate({
    path: "agent",
    select: "name email agencyName contact",
  });
  res.status(StatusCodes.OK).json({ property });
};
const updateProperty = async (req, res) => {
  const { id: propertyId } = req.params;

  const property = await Property.findOneAndUpdate(
    { _id: propertyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ property });
};

const deleteProperty = async (req, res) => {
  const { id: propertyId } = req.params;
  const property = await Property.findOne({ _id: propertyId });
  if (!property) {
    throw new CustomError.NotFoundError(
      `no property with id ${propertyId} found`
    );
  }
  checkAgentPermissions(req.user.agentId, property.agent.toString());
  await property.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "property successfully removed" });
};
module.exports = {
  createProperty,
  getSingleProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
};
