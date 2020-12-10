import { v4 as uuidv4 } from 'uuid';

import { ComponentField, ComponentFieldAttributes } from "../models/ComponentField";

export const getComponentFieldsResolver = () => async (
  { id }: { id: string },
): Promise<ComponentFieldAttributes[]> => {
  const componentFieldList = await ComponentField.findAll({
    where: { componentId: id },
  });
  const componentFields = componentFieldList.map((componentField) => componentField.get({ plain: true }));

  return componentFields;
};

export const createComponentFieldResolver = () => async (
  _: unknown,
  { componentId, componentFieldPayload }: { componentId: string; componentFieldPayload: ComponentFieldAttributes },
): Promise<ComponentFieldAttributes> => {
  const id = uuidv4();
  const { name, type, options } = componentFieldPayload;
  const componentField = await ComponentField.create({
    id,
    componentId,
    name,
    type,
    options,
  });

  return componentField;
};