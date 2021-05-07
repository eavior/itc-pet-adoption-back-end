const path = require('path');
const result = require('dotenv').config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
  throw new Error(result.error);
}

const express = require('express');
const pino = require('pino-http');
const { postgrator } = require('./lib/db');
const { uploadedFilesFolderName } = require('./middlewares/multipart');

const app = express();
app.use(express.json());
app.use(require('cors')());
app.use(pino({ level: process.env.LOG_LEVEL }));

app.use('/' + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use('/pet', require('./routes/pets'));
app.use('/user', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));

const host = process.env.HOST;
const port = +process.env.PORT;

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
