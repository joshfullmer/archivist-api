import { gql } from "apollo-server";

// TODO: Cleanup types (here and in Models)

export default gql`
  type Query {
    book(id: ID!): Book
    books: [Book]

    chapter(id: ID!): Chapter
    chapters(bookId: ID!): [Chapter]

    component(id: ID!): Component
    components: [Component]
  }

  type Mutation {
    createBook(bookPayload: BookPayload!): Book
    updateBook(id: ID!, bookPayload: BookPayload!): Boolean
    deleteBook(id: ID!): Boolean

    createChapter(bookId: ID!, chapterPayload: ChapterPayload!): Chapter
    updateChapter(id: ID!, chapterPayload: ChapterPayload!): Boolean
    deleteChapter(id: ID!): Boolean

    createComponent(name: String!): Component
    updateComponent(id: ID!, componentPayload: ComponentPayload): Boolean
    deleteComponent(id: ID!): Boolean

    createComponentField(componentId: ID!, componentFieldPayload: ComponentFieldPayload!): ComponentField

    createComponentRecord(componentId: ID!, name: String): ComponentRecord
    updateComponentRecord(id: ID!, name: String!): Boolean

    createOrUpdateComponentData(recordId: ID!, fieldId: ID!, data: String!): Boolean
  }

  type Book {
    id: ID
    title: String
    synopsis: String
    username: String
    chapters: [Chapter]
    createdAt: String
    updatedAt: String
  }

  input BookPayload { title: String, synopsis: String }

  type Chapter {
    id: ID
    bookId: ID
    number: Int
    title: String
    epigraph: String
    content: String
    createdAt: String
    updatedAt: String
  }

  input ChapterPayload {
    number: Int,
    title: String,
    epigraph: String,
    content: String
  }

  type Component {
    id: ID
    name: String
    fields: [ComponentField]
    records: [ComponentRecord]
    created: String
    updated: String
  }

  input ComponentPayload {
    name: String
  }

  enum ComponentFieldType {
    text
    boolean
    select
  }

  type ComponentField {
    id: ID
    componentId: ID
    name: String
    type: ComponentFieldType
    options: [String]
    created: String
    updated: String
  }

  input ComponentFieldPayload {
    name: String
    type: ComponentFieldType
    options: [String]
  }

  type ComponentRecord {
    id: ID
    componentId: ID
    name: String
    values: [ComponentData]
    createdAt: String
    updatedAt: String
  }

  type ComponentData {
    id: ID
    recordId: ID
    fieldId: ID
    data: String
    created: String
    updated: String
  }

  type User { id: ID, name: String, email: String }
`;
