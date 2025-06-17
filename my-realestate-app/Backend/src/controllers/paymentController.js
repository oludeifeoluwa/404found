const Stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Property = require('../models/Property');
const {StatusCodes} = require('http-status-codes')
const CustomError = require("../errors");
const checkAgentPermissions = require("../utils/checkAgentPermissions");

const buyProperty = async (req, res) => {
  const { propertyId } = req.body;
  const { id: userId, role } = req.user;
  
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new CustomError.NotFoundError('Property not found');
  }

  const paymentIntent = await Stripe.paymentIntents.create({
    amount: property.price * 100, // kobo
    currency: 'ngn',
    metadata: {
      propertyId,
      userId,
      role
    },
  });

  res.status(StatusCodes.OK).json({
    clientSecret: paymentIntent.client_secret,
  });
};


module.exports = { buyProperty };