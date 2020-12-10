import { v4 as uuidv4 } from 'uuid';

import { UserContext } from "../auth";
import { Book, BookAttributes } from "../models/Book";
import { BookPayload } from "../types";

export const getBookByIdResolver = () => async (
  _: unknown,
  { id }: { id: string },
  { user }: { user: UserContext },
): Promise<BookAttributes> => {
  const { username } = user;

  const book = await Book.findOne({ where: { username, id } });

  if (!book) {
    return {} as BookAttributes;
  }

  return book.get({ plain: true });
};

export const getBooksResolver = () => async (
  _: unknown,
  __: unknown,
  { user }: { user: UserContext },
): Promise<BookAttributes[]> => {
  const { username } = user;

  const booksList = await Book.findAll({ where: { username } });
  const books = booksList.map((book) => book.get({ plain: true }));

  return books;
};

export const createBookResolver = () => async (
  _: unknown,
  { bookPayload }: { bookPayload: BookPayload },
  { user }: { user: UserContext },
): Promise<BookAttributes> => {
  const { title = '', synopsis = '' } = bookPayload;
  const { username } = user;
  const id = uuidv4();

  const book = await Book.create({
    id,
    title,
    synopsis,
    username,
  });

  return book.get({ plain: true });
};

export const updateBookResolver = () => async (
  _: unknown,
  { bookPayload, id }: { bookPayload: BookPayload, id: string },
  { user }: { user: UserContext },
): Promise<boolean> => {
  const { title, synopsis } = bookPayload;
  const { username } = user;

  await Book.update({
    ...(title && { title }),
    ...(synopsis && { synopsis }),
  },
  { where: { username, id } });

  return true;
};

export const deleteBookResolver = () => async (
  _: unknown,
  { id }: { id: string },
  { user }: { user: UserContext },
): Promise<boolean> => {
  const { username } = user;

  await Book.destroy({
    where: { username, id },
  });

  return true;
};