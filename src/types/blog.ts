export interface IBlog {
  id: number;
  title: string;
  cover: string;
  category: {
    id: number;
    name: string;
  };
  tags: { id: number; name: string }[];
  publish_time: string;
  is_hide: boolean;
  summary: boolean;
  is_recommend: boolean;
  is_top: boolean;
  views: number;
  author: string;
  content: string;
  description: string;
  uuid: string;
}

type optionsType = {
  value: string;
  label: string;
};

export interface ICategories {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ITag {
  id: number;
  name: string;
  created_at: string;
}
export type CategoriesType = optionsType;
export type TagType = optionsType;
export type warehouseType = (string | number)[][];
