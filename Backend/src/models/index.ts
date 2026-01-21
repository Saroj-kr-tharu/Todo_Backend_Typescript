import fs from 'fs';
import path from 'path';
import process from 'process';
import { DataTypes, Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DB = {} as DB;

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.') === -1 &&
      file !== 'index.ts' &&
      file !== 'index.js'
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelModule = require(modelPath);
    
    // Handle both default exports and named exports
    const modelInitializer = modelModule.default || modelModule;
    
    if (typeof modelInitializer === 'function') {
      const model = modelInitializer(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;