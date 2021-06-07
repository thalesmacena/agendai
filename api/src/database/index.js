import Sequelize from 'sequelize';
import File from '../app/models/File';
import Schedule from '../app/models/Schedule';
import Unity from '../app/models/Unity';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, File, Unity, Schedule];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
