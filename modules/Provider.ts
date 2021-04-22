import { Sequelize } from 'sequelize';

import config from '../config.json';

const database = new Sequelize(config.database, {
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 20000,
    acquire: 40000,
    evict: 20000,
  },
});

class Database {
  public static get db(): Sequelize {
    return database;
  }

  public static async start(): Promise<void> {
    try {
      await database.authenticate();
      console.log('Connection established successfully');
    } catch (err) {
      console.error('Failed to establish a connection to the database', err);
    }

    try {
      await database.sync();
      console.log('Database synced successfully');
    } catch (err) {
      console.error('Failed to sync database', err);
    }
  }
}

export default Database;
