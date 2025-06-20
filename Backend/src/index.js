require('dotenv').config();
require('express-async-errors')
const express = require('express');
const app = express();

const {stripeWebhook} = require('./controllers/paymentController')

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }), // required for Stripe
  stripeWebhook
);
//packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


const PORT = process.env.PORT || 3000;
const connectDB = require('./database/connect');

// router
const universalAuthRouter = require('./routes/universalAuth')
const userAuthRouter = require('./routes/userAuthRoute')
const agentAuthRouter = require('./routes/agentAuthRoute')
const userRouter = require('./routes/userRoutes')
const propertyRouter = require('./routes/propertyRouter')
const paymentRouter = require('./routes/paymentRoute')

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/notFound')


  
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000", // Ife's frontend (Next.js dev server)
    credentials: true, // Important for sending cookies
  })
);
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/api/v1' , (req,res)=>{
    console.log(req.signedCookies)
    res.send('Homify')
})

app.use('/api/v1/auth/agent' , agentAuthRouter);
app.use('/api/v1/auth/user' , userAuthRouter);
app.use('/api/v1/auth' , universalAuthRouter);
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/property' , propertyRouter)
app.use('/api/v1/payment' , paymentRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT , console.log(`the app is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()