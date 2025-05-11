import React from 'react';
import {AnyAction} from 'redux';
import {APIError, handleErrorResponse} from '../error';

export interface RequestHooksState<D> {
  data: D | null;
  loading: boolean;
  error: APIError | null;
}

export const useRequest = <D, P = void>(
  request: (params: P) => Promise<D | APIError | AnyAction>,
): [
  RequestHooksState<D>,
  (params: P) => Promise<D>,
  (newData: D | null) => void,
  () => void,
] => {
  const initialState = {data: null, loading: false, error: null};
  const [state, setState] = React.useState<RequestHooksState<D>>(initialState);

  const fetchApi = (params: P) => {
    setState({loading: true, error: null, data: null});
    return new Promise<D>((resolve, reject) => {
      request(params)
        .then(data => {
          setState({loading: false, data: data as D, error: null});
          resolve(data as D);
        })
        .catch(error => {
          const errorMessage = handleErrorResponse(error) as string;
          const err: APIError = error ? error : {message: errorMessage};
          setState({loading: false, data: null, error: err});
          reject(err);
        });
    });
  };
  const updateData = (newData: D | null) => {
    setState({...state, data: newData});
  };

  const clearErr = () => setState({...state, error: null});

  return [state, fetchApi, updateData, clearErr];
};
