import '../typings';

import { DataTypes, Model } from 'sequelize';

import Provider from '../Provider';

class Session extends Model {
  public userID!: string | null;

  public guildID!: string | null;

  public state!: State | null;

  public finished!: boolean;
}

Session.init(
  {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: DataTypes.JSONB,
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { sequelize: Provider.db }
);

Session.sync();

export default Session;
