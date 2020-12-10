import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { User } from "./User";

interface BookAttributes {
  id: string;
  title: string;
  synopsis: string;
  username: string;
}

interface BookInstance extends Model<BookAttributes>, BookAttributes {}

const Book = sequelize.define<BookInstance>('book', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  synopsis: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'username',
    },
  },
});

Book.belongsTo(User, { foreignKey: 'username' });

export { Book, BookInstance, BookAttributes };