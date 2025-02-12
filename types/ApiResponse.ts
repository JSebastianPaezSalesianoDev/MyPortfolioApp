export type ApiResponse<T> = {
  message: string;
  object: T;
  statusCode: number;
};
