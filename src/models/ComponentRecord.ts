import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';
import { Component } from "./Component";

interface ComponentRecordAttributes {
  id: string;
  componentId: string;
  name: string;
}

interface ComponentRecordInstance extends Model<ComponentRecordAttributes>, ComponentRecordAttributes {}

const ComponentRecord = sequelize.define<ComponentRecordInstance>('component_record', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  componentId: {
    type: DataTypes.UUID,
    references: {
      model: 'components',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
  },
});

ComponentRecord.belongsTo(Component);

export { ComponentRecord, ComponentRecordInstance, ComponentRecordAttributes };