// const path = require('path');
// const result = require('dotenv').config({
//   path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
// });

// if (result.error) {
//   throw new Error(result.error);
// }

const express = require('express');
const pino = require('pino-http');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const { uploadedFilesFolderName } = require('./middlewares/multipart');

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(cors());
app.use(pino({ level: process.env.LOG_LEVEL }));

app.use('/' + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use('/pet', require('./routes/pets'));
app.use('/user', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));

const host = '0.0.0.0';
const port = 8080;

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
