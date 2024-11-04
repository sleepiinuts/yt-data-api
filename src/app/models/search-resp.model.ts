import { SearchResult } from './search-result.model';

export interface SearchResp {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: SearchResult[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
