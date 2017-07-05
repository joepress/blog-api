const express = require('express');
const router = express.Router();

const morgan = require('morgan');
const bodyparser = require('body-parser');

const app = express();

const blogPostRouter = require('./blogPostRouter');




app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});