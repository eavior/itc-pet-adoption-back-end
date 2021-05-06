console.log(process.env.NODE_ENV);

const path = require('path');
const result = require('dotenv').config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
  throw new Error(result.error);
}

const express = require('express');
const { postgrator, query } = require('./lib/db');
const { uploadedFilesFolderName } = require('./middlewares/multipart');
const { auth } = require('./middlewares/auth');
const { getCurrentUser } = require('./data/users');

const app = express();
app.use(express.json());
app.use(require('cors')());

// all GET requests to /public/... will be served as files
app.use('/' + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use('/pets', require('./routes/pets'));
app.use('/users', require('./routes/users'));

// app.get('/', (req, res) => {
//   // console.log(req.query); // everything after ?
//   res.send('Hello world');
// });

app.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const results = await getCurrentUser(userId);
  res.send({ user: results });
});

const host = process.env.HOST;
const port = process.env.PORT;

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
