export interface SearchResult {
  kind?: string;
  etag?: string;
  id?: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt?: Date;
    channelId?: string;
    title: string;
    description: string;
    thumbnails: {
      default?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle?: string;
    liveBroadcastContent?: string;
  };
}
