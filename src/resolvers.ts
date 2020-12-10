import {
  createBookResolver,
  deleteBookResolver,
  getBookByIdResolver,
  getBooksResolver,
  updateBookResolver,
} from "./resolvers/book.resolver";
import {
  createChapterResolver,
  deleteChapterResolver,
  getBookChaptersResolver,
  getChapterByIdResolver,
  getChaptersResolver,
  updateChapterResolver,
} from "./resolvers/chapter.resolver";
import {
  createComponentResolver,
  deleteComponentResolver,
  getComponentByIdResolver,
  getComponentsResolver,
  updateComponentResolver,
} from "./resolvers/component.resolver";
import {
  createComponentFieldResolver,
  getComponentFieldsResolver,
} from "./resolvers/componentField.resolver";
import {
  createComponentRecordResolver,
  getComponentRecordsResolver,
  updateComponentRecordResolver,
} from "./resolvers/componentRecord.resolver";
import {
  createOrUpdateComponentDataResolver,
  getComponentDataByRecordResolver,
} from "./resolvers/componentData.resolver";

export default {
  Query: {
    book: getBookByIdResolver(),
    books: getBooksResolver(),

    chapter: getChapterByIdResolver(),
    chapters: getChaptersResolver(),

    component: getComponentByIdResolver(),
    components: getComponentsResolver(),
  },

  Mutation: {
    createBook: createBookResolver(),
    updateBook: updateBookResolver(),
    deleteBook: deleteBookResolver(),

    createChapter: createChapterResolver(),
    updateChapter: updateChapterResolver(),
    deleteChapter: deleteChapterResolver(),

    createComponent: createComponentResolver(),
    updateComponent: updateComponentResolver(),
    deleteComponent: deleteComponentResolver(),

    createComponentField: createComponentFieldResolver(),

    createComponentRecord: createComponentRecordResolver(),
    updateComponentRecord: updateComponentRecordResolver(),

    createOrUpdateComponentData: createOrUpdateComponentDataResolver(),
  },

  Book: {
    chapters: getBookChaptersResolver(),
  },

  Component: {
    fields: getComponentFieldsResolver(),

    records: getComponentRecordsResolver(),
  },

  ComponentRecord: {
    values: getComponentDataByRecordResolver(),
  },
};