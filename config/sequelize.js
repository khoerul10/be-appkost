const { Sequelize } = require('sequelize');

// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME

// Konfigurasi koneksi database
const sequelizeDb = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Test koneksi
sequelizeDb
  .authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));


module.exports = sequelizeDb;
