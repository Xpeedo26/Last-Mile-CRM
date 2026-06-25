export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
  timestamp: string;
}

export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): ApiResponse<T> => ({
  success: true,
  message,
  data,
  statusCode,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  error: string,
  message: string = 'Error',
  statusCode: number = 400
): ApiResponse => ({
  success: false,
  message,
  error,
  statusCode,
  timestamp: new Date().toISOString(),
});