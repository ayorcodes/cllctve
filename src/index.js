const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const dbConfig = require('./config/db');
require('dotenv').config();
const routes = require('./routes');
const AppConstants = require('./config');

const app = express();

class App {
  constructor() {
    this.initDB();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(AppConstants.PORT, () =>
      console.log(`App is running on port ${AppConstants.PORT}`)
    );
  }

  initExpressMiddleware() {
    require('dotenv').config();
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));
  }

  initDB() {
    mongoose.set('useCreateIndex', true);
    mongoose
      .connect(AppConstants.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database is connected');
      })
      .catch((err) => {
        console.log({ database_error: err });
      });
  }

  initRoutes() {
    app.get('/', (req, res) => {
      res.json('Hello Collective');
    });

    app.use(routes);
  }
}
new App();
