export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface ShareImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  created_at: Date;
  updated_at: Date;
}

export interface Picture {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  created_at: Date;
  updated_at: Date;
}

export interface CoverImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  created_at: Date;
  updated_at: Date;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  shareImage: ShareImage;
}

export interface Hero {
  id: number;
  title: string;
}

export interface Localization {
  id: number;
  locale: string;
  published_at: Date;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Formats {
  thumbnail?: Thumbnail;
  large?: Large;
  medium?: Medium;
  small?: Small;
}

export interface Favicon {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  created_at: Date;
  updated_at: Date;
}

export interface Writer {
  id: number;
  name: string;
  Role: string;
  ShortBio: string;
  email: string;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
  picture: Picture;
}

export interface Category {
  id: number;
  name: string;
  order: number;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
}

export interface PhotoPost {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  slug_2nd_locale: string;
  article: number;
  writer: number;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  date: Date;
  image: Image;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  nOfPics: number;
  slug: string;
  slug_2nd_locale: string;
  writer: number;
  category: number;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  date: Date;
  cover_image: CoverImage;
}

export interface GlobalResponse {
  id: number;
  siteName: string;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  defaultSeo: SEO;
  localizations: Localization[];
}

export interface HomepageResponse {
  id: number;
  photo_post: PhotoPost;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  HomepageSEO: SEO;
  HomepageHero: Hero;
  localizations: Localization[];
}

export interface TeamPageResponse {
  id: number;
  Footer_Message: string;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  TeamSEO: SEO;
  TeamPageHero: Hero;
  writers: Writer[];
  localizations: Localization[];
}

export interface WritersResponse {
  id: number;
  name: string;
  Role: string;
  ShortBio: string;
  email: string;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
  picture: Picture;
  articles: Article[];
  photo_posts: PhotoPost[];
  localizations: Localization[];
}

export interface TagsResponse {
  id: number;
  name: string;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
  photo_posts: PhotoPost[];
  localizations: Localization[];
}

export interface CategoriesResponse {
  id: number;
  name: string;
  order: number;
  slug: string;
  slug_2nd_locale: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
  articles: Article[];
  localizations: Localization[];
}

export interface ArticlesResponse {
  id: number;
  title: string;
  description: string;
  nOfPics: number;
  slug: string;
  slug_2nd_locale: string;
  writer: Writer;
  category: Category;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  date: Date;
  cover_image: CoverImage;
  photo_posts: PhotoPost[];
  localizations: Localization[];
}

export interface PhotoPostsResponse {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  slug_2nd_locale: string;
  article: Article;
  writer: Writer;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  date: Date;
  image: Image;
  tags: Tag[];
  localizations: Localization[];
}

type defaultSeo = SEO;

export interface GlobalObject {
  id: number;
  siteName: string;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  defaultSeo: defaultSeo;
  localizations: Localization[];
}
