const mysql = require('mysql');
const path = require('path');
const Postgrator = require('postgrator');

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, '../migrations'),
  driver: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'pets_db',
  username: 'site',
  password: 'dUzM48!we#',
  schemaTable: 'migrations',
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'site',
  password: 'dUzM48!we#',
  database: 'pets_db',
});
exports.pool = pool;

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else resolve(result);
    });
  });
}
exports.query = query;
