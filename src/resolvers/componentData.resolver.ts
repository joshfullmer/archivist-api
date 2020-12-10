import { v4 as uuidv4 } from 'uuid';

import { ComponentData, ComponentDataAttributes } from "../models/ComponentData";

export const getComponentDataByRecordResolver = () => async (
  { id }: { id: string },
): Promise<ComponentDataAttributes[]> => {
  const componentDataList = await ComponentData.findAll({
    where: { recordId: id },
  });
  const componentData = componentDataList.map((componentData) => componentData.get({ plain: true }));

  return componentData;
};

export const createOrUpdateComponentDataResolver = () => async (
  _: unknown,
  { recordId, fieldId, data }: { recordId: string, fieldId: string, data: string },
): Promise<boolean> => {
  const existingComponentData = await ComponentData.findOne({
    where: { recordId, fieldId },
  });

  if (existingComponentData) {
    existingComponentData.update({
      ...(data && { data }),
    },
    {
      where: { recordId, fieldId },
    });
  } else {
    const id = uuidv4();

    ComponentData.create({
      id,
      recordId,
      fieldId,
      data,
    });
  }

  return true;
};