type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'DUPLICATE';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: string
};

// export type ServiceResponseUpdateError = {
//   status: ServiceResponseErrorType, 
//   data: string
// };

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL', 
  data: T
};

export type ServiceResponseSuccessUpdate<T> = {
  status: 'SUCCESSFUL', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;