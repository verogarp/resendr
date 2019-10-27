const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet')
const authenticate = require("./middlewares/authenticate")
const app = express()


// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require('./.env');
const environment = process.env.NODE_ENV;
config = config[environment];
if (!config) return console.error(`❌ Invalid ${environment} environment`);

// MIDDLEWARES
app.use(cors()); // Using cors middleware
app.use(morgan('combined')); // Using morgan middleware
app.use(express.json()); // Using JSON Body parser middleware
app.use(helmet())

// NONGOOSE
mongoose.connect(config.mongoURL + config.mongoDBName);

// ROUTING
const apiRouter = require('./routes');
app.use('/api', apiRouter);
app.use('/api', authenticate);

// Init server
app.listen(config.port, (err) => {
  console.info('\n\n' + '>'.repeat(40))
  console.info(`💻  Reboot Server Live`);
  console.info(`📡  PORT: http://localhost:${config.port}`);
  console.info(">".repeat(40) + "\n\n");
})
