export interface TagOrCategory {
  id: number;
  name: string;
  count: number;
  link: string;
}

export interface Settings {
  name: string;
  description: string;
  url: string;
  site_icon_url: string;
}

export interface API_RESPONSE {
  isWordPress: boolean;
  isVip: boolean;
  isForbidden: boolean;
  categories: Array<TagOrCategory>;
  tags: Array<TagOrCategory>;
  settings: Settings;
}