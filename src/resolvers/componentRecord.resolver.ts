import { v4 as uuidv4 } from 'uuid';

import { ComponentRecord, ComponentRecordAttributes } from "../models/ComponentRecord";

export const getComponentRecordsResolver = () => async (
  { id }: { id: string },
): Promise<ComponentRecordAttributes[]> => {
  const componentRecordList = await ComponentRecord.findAll({
    where: { componentId: id },
  });
  const componentRecords = componentRecordList.map((componentRecord) => componentRecord.get({ plain: true }));

  return componentRecords;
};

export const createComponentRecordResolver = () => async (
  _: unknown,
  { componentId, name }: { componentId: string; name: string },
): Promise<ComponentRecordAttributes> => {
  const id = uuidv4();
  const componentRecord = await ComponentRecord.create({
    id,
    componentId,
    name,
  });

  return componentRecord.get({ plain: true });
};

export const updateComponentRecordResolver = () => async (
  _: unknown,
  { id, name }: { id: string; name: string },
): Promise<boolean> => {
  await ComponentRecord.update({
    ...(name && { name }),
  },
  {
    where: { id },
  });

  return true;
};