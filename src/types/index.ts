// Articles
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
  created_by: number
  featured: number
  images: string
  metadesc: string
  metakey: string
}

// Categories
export interface Category {
  id: number
  title: string
  alias: string
  description?: string
  published: number
  created_time: string
  hits: number
}

// Contacts
export interface Contact {
  id: number
  name: string
  alias: string
  con_position?: string
  address?: string
  suburb?: string
  state?: string
  country?: string
  postcode?: string
  telephone?: string
  fax?: string
  email_to?: string
  mobile?: string
  webpage?: string
  published: number
  catid: number
  featured: number
}

// Attachments
export interface Attachment {
  id: number
  filename?: string
  display_name?: string
  description?: string
  file_type?: string
  file_size?: number
  url?: string
  uri_type?: string
  parent_type?: string
  parent_id?: number
  created?: string
  download_count: number
  state: number
}

// Comments
export interface Comment {
  id: number
  contentid: number
  component: string
  name?: string
  username?: string
  title?: string
  comment?: string
  email?: string
  date?: string
  published: number
  parentid: number
  voting_yes: number
  voting_no: number
  voting: number
}

// Stats
export interface StatsOverview {
  content: {
    total_articles: number
    published_articles: number
    featured_articles: number
    draft_articles: number
  }
  categories: {
    total_categories: number
    active_categories: number
  }
  contacts: {
    total_contacts: number
    published_contacts: number
  }
  attachments: {
    total_files: number
    active_files: number
    total_downloads: number
  }
  comments: {
    total_comments: number
    published_comments: number
    pending_moderation: number
  }
  banners: {
    total_banners: number
    active_banners: number
    total_clicks: number
  }
}

export interface PopularArticle {
  id: number
  title: string
  hits: number
  created: string
  catid: number
  featured: number
}

export interface RecentContent {
  recent_articles: Array<{
    id: number
    title: string
    created: string
    catid: number
    hits: number
  }>
  recent_comments: Array<{
    id: number
    contentid: number
    name: string
    comment: string
    date: string
  }>
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}