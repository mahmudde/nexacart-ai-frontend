export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: ApiMeta;
  errors?: unknown;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
  stack?: string;
};
