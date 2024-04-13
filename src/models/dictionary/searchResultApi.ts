export interface SearchResultApi {
  slug: string;
  is_common?: boolean;
  tags: string[];
  jlpt: string[];
  japanese: JapaneseReadingApi[];
  senses: SenseApi[];
  attribution: AttributionApi;
}

export interface AttributionApi {
  jmdict: boolean;
  jmnedict: boolean;
  dbpedia: boolean | string;
}

export interface JapaneseReadingApi {
  word?: string;
  reading: string;
}

export interface SenseApi {
  english_definitions: string[];
  parts_of_speech: string[];
  links: Link[];
  tags: string[];
  restrictions: any[];
  see_also: string[];
  antonyms: any[];
  source: any[];
  info: any[];
  sentences?: any[];
}

export interface LinkApi {
  text: string;
  url: string;
}
