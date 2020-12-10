import { v4 as uuidv4 } from 'uuid';

import { UserContext } from "../auth";
import { Component, ComponentAttributes } from "../models/Component";
import { ComponentPayload } from '../types';

export const getComponentByIdResolver = () => async (
  _: unknown,
  { id }: { id: string },
  { user }: { user: UserContext },
): Promise<ComponentAttributes> => {
  const { username } = user;
  const component = await Component.findOne({
    where: { id, username },
  });

  if (!component) {
    return {} as ComponentAttributes;
  }

  return component.get({ plain: true });
};

export const getComponentsResolver = () => async (
  _: unknown,
  __: unknown,
  { user }: { user: UserContext },
): Promise<ComponentAttributes[]> => {
  console.log('here');
  const { username } = user;
  const componentsList = await Component.findAll({
    where: { username },
  });
  const components = componentsList.map((component) => component.get({ plain: true }));

  return components;
};

export const createComponentResolver = () => async (
  _: unknown,
  { name }: { name: string },
  { user }: { user: UserContext },
): Promise<ComponentAttributes> => {
  const { username } = user;
  const id = uuidv4();
  const component = await Component.create({
    id,
    name,
    username,
  });

  return component.get({ plain: true });
};

export const updateComponentResolver = () => async (
  _: unknown,
  { id, componentPayload }: { id: string; componentPayload: ComponentPayload },
  { user }: { user: UserContext },
): Promise<boolean> => {
  const { username } = user;
  const { name } = componentPayload;

  await Component.update({
    ...(name && { name }),
  },
  {
    where: { id, username },
  });

  return true;
};

export const deleteComponentResolver = () => async (
  _: unknown,
  { id }: { id: string },
  { user }: { user: UserContext },
): Promise<boolean> => {
  const { username } = user;

  await Component.destroy({ where: { id, username } });

  return true;
};