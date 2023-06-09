export interface Hero {
  id: number;
  title: string;
}

export interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  shareImage: Picture;
}

export interface Homepage {
  id: number;
  photo_post: PhotoPost;
  created_at: string;
  updated_at: string;
}

export interface Picture {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {};
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: {
    public_id: string;
    resource_type: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_GR: string;
  slug: string;
  name_EN: string;
  created_at: string;
  updated_at: string;
  articles?: ArticleSimple[];
}

export interface ArticleSimple {
  id: number;
  title_GR: string;
  description_GR: string;
  slug: string;
  category: number;
  author: number;
  title_EN: string;
  description_EN: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  cover_image: Picture;
  nOfPics?: number;
}

export interface Writer {
  id: number;
  slug: string;
  name_GR: string;
  name_EN: string;
  email: string;
  ShortBio_GR: string;
  ShortBio_EN: string;
  Role_GR: string;
  Role_EN: string;
  created_at: string;
  updated_at: string;
  picture: Picture;
  articles?: Article[];
  photo_posts?: PhotoPost[];
}

export interface Tag {
  id: number;
  slug: string;
  name_GR: string;
  name_EN: string;
  photo_posts?: PhotoPost[];
  created_at: string;
  updated_at: string;
}

export interface PhotoPostSimple {
  id: number;
  description_GR: string;
  content_GR: string;
  slug: string;
  description_EN: string;
  content_EN: string;
  title_GR: string;
  title_EN: string;
  writer: number;
  article: number;
  created_at: string;
  updated_at: string;
  image: Picture;
}

export interface Article {
  id: number;
  title_GR: string;
  description_GR: string;
  slug: string;
  category: number;
  author: Writer;
  title_EN: string;
  description_EN: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  cover_image: Picture;
  nOfPics?: number;
  photo_posts: PhotoPostSimple[];
}

export interface PhotoPost {
  id: number;
  slug: string;
  title_GR: string;
  title_EN: string;
  description_GR: string;
  description_EN: string;
  content_GR: string;
  content_EN: string;
  image: Picture;
  writer: Writer;
  article: Article;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}
