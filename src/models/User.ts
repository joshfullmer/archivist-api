import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';

enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

interface UserAttributes {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('user', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [Object.keys(UserRole)],
    },
  },
});

export { User, UserInstance, UserRole };