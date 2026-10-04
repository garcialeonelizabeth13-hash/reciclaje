/**
 * Tipos de datos para artículos y categorías de Joomla
 */

export interface Category {
  id: number
  title: string
  alias: string
  description?: string
  published: number
  created_time: string
  hits: number
}

export interface Article {
  id: number
  title: string
  alias: string
  introtext: string
  fulltext: string
  state: number
  catid: number
  created: string
  modified: string
  hits: number
  featured: number
}

export interface ArticleDetail extends Article {
  created_by: number
  images: string
  metadesc: string
  metakey: string
  category_name?: string
  category_alias?: string
}
