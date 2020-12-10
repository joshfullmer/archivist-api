import { v4 as uuidv4 } from 'uuid';

import { BookAttributes } from '../models/Book';
import { Chapter, ChapterAttributes } from '../models/Chapter';
import { ChapterPayload } from '../types';

export const getChapterByIdResolver = () => async (
  _: unknown,
  { id }: { id: string },
): Promise<ChapterAttributes> => {
  const chapter = await Chapter.findOne({ where: { id } });

  if (!chapter) {
    return {} as ChapterAttributes;
  }

  return chapter.get({ plain: true });
};

export const getChaptersResolver = () => async (
  _: unknown,
  { bookId }: { bookId: string },
): Promise<ChapterAttributes[]> => {
  const chaptersList = await Chapter.findAll({ where: { bookId } });
  const chapters = chaptersList.map((chapter) => chapter.get({ plain: true }));

  return chapters;
};

export const createChapterResolver = () => async (
  _: unknown,
  { bookId, chapterPayload }: { bookId: string, chapterPayload: ChapterPayload },
): Promise<ChapterAttributes> => {
  const { number = 0, title = '', epigraph = '', content = '' } = chapterPayload;
  const id = uuidv4();
  const chapter = await Chapter.create({
    id,
    bookId,
    number,
    title,
    epigraph,
    content,
  });

  return chapter.get({ plain: true });
};

export const updateChapterResolver = () => async (
  _: unknown,
  { id, chapterPayload }: { id: string, chapterPayload: ChapterPayload },
): Promise<boolean> => {
  const { number, title, epigraph, content } = chapterPayload;

  await Chapter.update({
    ...(number && { number }),
    ...(title && { title }),
    ...(epigraph && { epigraph }),
    ...(content && { content }),
  },
  { where: { id } });

  return true;
};

export const deleteChapterResolver = () => async (
  _: unknown,
  { id }: { id: string },
): Promise<boolean> => {
  await Chapter.destroy({
    where: { id },
  });

  return true;
};

export const getBookChaptersResolver = () => async (
  { id }: BookAttributes,
): Promise<ChapterAttributes[]> => {
  if (id) {
    const chaptersData = await Chapter.findAll({ where: { bookId: id } });
    const chapters = chaptersData.map((chapter) => chapter.get({ plain: true }));

    return chapters;
  } else {
    return [];
  }
};