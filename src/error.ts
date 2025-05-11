import {isEmptyValue} from './utils';

interface ErrorResponse {
  error: {
    code: string;
    status: number;
    message: string;
    path: string;
    appName: string;
    data: Record<string, any>;
    timestamp: number;
  };
}

interface Response<T> {
  errors: ErrorResponse[];
  data: {
    [key: string]: T | null;
  };
}

export interface APIError {
  appName: string;
  code: string;
  data: any;
  message: string;
  status: number;
}

export function handleErrorResponse<T>(
  response: Response<T>,
  callBack?: () => void,
): T | null {
  let result: T | null = null;

  (() => {
    if (response?.errors?.length > 0) {
      const error = response.errors[0] as any;
      const contentError = error?.extensions?.content?.error;
      if (contentError?.data && Object.keys(contentError?.data).length > 0) {
        result = contentError?.data[Object.keys(contentError?.data)[0]] as T;
      } else if (contentError?.message) {
        result = contentError?.message;
      } else {
        result = error?.message;
      }
    } else if (response?.data) {
      if (Object.keys(response?.data).length > 0) {
        result = response?.data[Object.keys(response?.data)[0]] as T;
      } else {
        result = (response as any)?.message;
      }
    } else if ((response as any)?.message) {
      result = (response as any)?.message;
      if (isEmptyValue(result)) {
        result = 'An error occurred. Please try again later.' as unknown as T;
      }
    } else if ('message' in response) {
      result = (response as any)?.message;

      // Check if the message is a string and if it is empty
      if (
        typeof result === 'string' &&
        (isEmptyValue(result) || result === '')
      ) {
        result = 'An error occurred. Please try again later.' as unknown as T;
      }
    }
  })();

  if (callBack) {
    callBack();
  }

  return result;
}
