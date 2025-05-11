import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

/**
 * Generic fetcher function signature

 * useQueryRequest: A generic custom hook wrapping react-query useQuery
 *
 * @typeParam TResponse - the shape of the data returned by the fetcher
 * @typeParam TRequest  - the shape of the parameters passed to the fetcher
 *
 * @param queryKey - unique key (or array) for the query cache
 * @param fetcher  - a function that accepts TRequest and returns a Promise<TResponse>
 * @param params   - parameters to pass into the fetcher
 * @param options  - optional react-query configuration (staleTime, retry, etc.)
 *
 * @returns UseQueryResult containing data, status flags, and error
 */

type Fetcher<TRequest, TResponse> = (params: TRequest) => Promise<TResponse>;

export function useQueryRequest<TResponse>(
  queryKey: QueryKey,
  fetcher: Fetcher<void, TResponse>,
  options?: Omit<
    UseQueryOptions<TResponse, Error, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TResponse, Error>;

export function useQueryRequest<TResponse, TRequest>(
  queryKey: QueryKey,
  fetcher: Fetcher<TRequest, TResponse>,
  params: TRequest,
  options?: Omit<
    UseQueryOptions<TResponse, Error, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TResponse, Error>;

// Implementation
export function useQueryRequest<TResponse, TRequest = void>(
  queryKey: QueryKey,
  fetcher: Fetcher<TRequest, TResponse>,
  paramsOrOptions?:
    | TRequest
    | Omit<
        UseQueryOptions<TResponse, Error, TResponse, QueryKey>,
        'queryKey' | 'queryFn'
      >,
  maybeOptions?: Omit<
    UseQueryOptions<TResponse, Error, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TResponse, Error> {
  const hasParams = arguments.length > 2 && maybeOptions !== undefined;
  const params = hasParams
    ? (paramsOrOptions as TRequest)
    : (undefined as any as TRequest);
  const options = hasParams ? maybeOptions! : (paramsOrOptions as any);

  const key: QueryKey = Array.isArray(queryKey)
    ? hasParams
      ? [...queryKey, params]
      : queryKey
    : hasParams
    ? [queryKey, params]
    : [queryKey];

  return useQuery<TResponse, Error>({
    queryKey: key,
    queryFn: () => fetcher(params),
    ...options,
    // keepPreviousData: true,
  });
}
