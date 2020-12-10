import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';
import { Book } from "./Book";

interface ChapterAttributes {
  id: string;
  bookId: string;
  number: number;
  title: string;
  epigraph: string;
  content: string;
}

interface ChapterInstance extends Model<ChapterAttributes>, ChapterAttributes {}

const Chapter = sequelize.define<ChapterInstance>('chapter', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.UUID,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  number: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  epigraph: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
});

Chapter.belongsTo(Book);

export { Chapter, ChapterInstance, ChapterAttributes };