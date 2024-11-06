export interface ErrResp {
  header: any;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: {
    error: {
      code: number;
      message: string;
      errors: {
        message: string;
        domain: string;
        reason: string;
      }[];
    };
  };
}
