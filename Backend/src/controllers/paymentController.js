const Stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Property = require('../models/Property');
const {StatusCodes} = require('http-status-codes')
const CustomError = require("../errors");
const checkAgentPermissions = require("../utils/checkAgentPermissions");

const createCheckoutSession = async (req, res) => {
  const { propertyId } = req.body;
  const { id: userId, role } = req.user;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "ngn",
          unit_amount: property.price * 100, // amount in kobo
          product_data: {
            name: property.title,
            description: property.description || "Real estate property",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      propertyId,
      role,
    },
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/failed`,
  });

  res.status(200).json({ url: session.url });
};


const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;
    const { userId, propertyId, role } = metadata;

    // Mark property as paid

    await Property.findByIdAndUpdate(propertyId, {
      availabilityStatus: "sold",
      paidBy: {
        _id: userId,
        role,
      },
    });
  }

  res.status(200).json({ received: true });
};
module.exports = { createCheckoutSession  , stripeWebhook};