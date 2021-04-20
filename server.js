const express = require('express');
const { postgrator, query } = require('./lib/db');

const app = express();
app.use(express.json());
app.use(require('cors')());

app.use('/pets', require('./routes/pets'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

const host = '127.0.0.1';
const port = '5500';

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
