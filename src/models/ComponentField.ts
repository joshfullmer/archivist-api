import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';
import { Component } from "./Component";

enum ComponentFieldType {
  TEXT = 'text',
  BOOLEAN = 'boolean',
  SELECT = 'select'
}

interface ComponentFieldAttributes {
  id: string;
  componentId: string;
  name?: string;
  type?: ComponentFieldType;
  options?: string[];
}

interface ComponentFieldInstance extends Model<ComponentFieldAttributes>, ComponentFieldAttributes {}

console.log(Object.values(ComponentFieldType));

const ComponentField = sequelize.define<ComponentFieldInstance>('component_field', {
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
  type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(ComponentFieldType)],
    },
  },
  options: {
    type: DataTypes.STRING,
    validate: {
      is: /\[[^[]]*?\]/i,
    },
  },
});

ComponentField.belongsTo(Component);

export { ComponentField, ComponentFieldInstance, ComponentFieldAttributes };