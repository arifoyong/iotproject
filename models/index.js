const Sequelize = require('sequelize');
const DeviceModel = require('./Device');
const RecordModel = require('./Record');
const config = require('config');

const DB = config.get('DB_ADD');
const DBNAME = config.get('DB_NAME')
const USER = config.get('DB_USER');
const PW = config.get('DB_PW');

const sequelize = new Sequelize(DBNAME, USER, PW, {
  host: DB,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
});

const Device = DeviceModel(sequelize, Sequelize);
const Record = RecordModel(sequelize, Sequelize);

Device.hasMany(Record);
Record.belongsTo(Device);

sequelize.sync({ force: false }).then(() => {
  console.log('Database created')
});

module.exports = {
  Device,
  Record
};