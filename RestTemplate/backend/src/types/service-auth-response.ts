interface ServiceAPIResponse<T> {
  body: T | null;
  headers?: Object;
  message: string;
  success: boolean;
}

interface ServiceAuthResponse<T> {
  body?: T | null;
  headers?: Object;
  message: string;
  token?: string;
  success: boolean;
}

export { ServiceAPIResponse, ServiceAuthResponse };
