import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';
import { User } from "./User";

interface ComponentAttributes {
  id: string;
  username: string;
  name: string;
}

interface ComponentInstance extends Model<ComponentAttributes>, ComponentAttributes {}

const Component = sequelize.define<ComponentInstance>('component', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'username',
    },
  },
  name: {
    type: DataTypes.STRING,
  },
});

Component.belongsTo(User, { foreignKey: 'username' });

export { Component, ComponentInstance, ComponentAttributes };
