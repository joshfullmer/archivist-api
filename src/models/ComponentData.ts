import { DataTypes, Model } from "sequelize";
import { sequelize } from '../sequelize';
import { ComponentField } from "./ComponentField";
import { ComponentRecord } from "./ComponentRecord";

interface ComponentDataAttributes {
  id: string;
  recordId: string;
  fieldId: string;
  data: string;
}

interface ComponentDataInstance extends Model<ComponentDataAttributes>, ComponentDataAttributes {}

const ComponentData = sequelize.define<ComponentDataInstance>('component_data', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  recordId: {
    type: DataTypes.UUID,
    references: {
      model: 'component_records',
      key: 'id',
    },
  },
  fieldId: {
    type: DataTypes.UUID,
    references: {
      model: 'component_fields',
      key: 'id',
    },
  },
  data: {
    type: DataTypes.STRING,
  },
});

ComponentData.belongsTo(ComponentRecord);
ComponentData.belongsTo(ComponentField);

export { ComponentData, ComponentDataInstance, ComponentDataAttributes };