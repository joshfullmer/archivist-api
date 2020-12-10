export type Book = {
  id: string
  title: string
  synopsis: string
  username: string
  created: string
  updated: string
}

export type BookPayload = {
  title?: string
  synopsis?: string
}

export type Chapter = {
  id: string
  bookId: string
  number: string
  title: string
  epigraph: string
  content: string
  created: string
  updated: string
}

export type ChapterDto = {
  id: string
  book_id: string
  number: string
  title: string
  epigraph: string
  content: string
  created: string
  updated: string
}

export type ChapterPayload = {
  number?: number
  title?: string
  epigraph?: string
  content?: string
}

export type Component = {
  id: string
  name: string
  created: string
  updated: string
}

export type ComponentPayload = {
  name?: string
}

export type ComponentField = {
  id: string
  componentId: string
  name: string
  type: 'text' | 'boolean' | 'select'
  options: string[]
  created: string
  updated: string
}

export type ComponentFieldDto = {
  id: string
  component_id: string
  name: string
  type: 'text' | 'boolean' | 'select'
  options: string
  created: string
  updated: string
}

export type ComponentFieldPayload = {
  componentId: string
  name?: string
  type?: 'text' | 'boolean' | 'select'
  options?: string[]
}

export type ComponentData = {
  id: string
  componentId: string
  data: string
  created: string
  updated: string
}

export type ComponentDataDto = {
  id: string
  component_id: string
  data: string
  created: string
  updated: string
}

export type User = {
  id: string
  name: string
  email: string
}