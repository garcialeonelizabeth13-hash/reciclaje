export interface Article {
  id: number
  title: string
  introtext: string
  fulltext: string
  state: number
  catid: number
  created: string
  modified: string
  hits: number
  created_by: number
  featured: number
  images: string
  metadesc: string
  metakey: string
}

export interface Category {
  id: number
  title: string
  alias: string
  description: string
  published: number
}

export interface Comment {
  id: number
  contentid: number
  name: string
  comment: string
  date: string
  published: number
}
