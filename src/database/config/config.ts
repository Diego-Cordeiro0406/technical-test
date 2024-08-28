const dotenv = require('dotenv')
dotenv.config()
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  host: process.env.MYSQL_HOST,
  port: 3306,
  dialect: 'mysql',
};

export = config;