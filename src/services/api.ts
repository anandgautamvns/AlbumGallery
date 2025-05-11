import {API_BASE_URL, DEFAULT_PAGE_SIZE} from './constant';
import {ApiMethod} from './enum';
import {AlbumRequest, AlbumResponse} from './type';

export const fetchAlbums = async (
  request: AlbumRequest,
): Promise<AlbumResponse> => {
  const {term, limit = DEFAULT_PAGE_SIZE} = request;
  const url = `${API_BASE_URL}/search?term=${encodeURIComponent(
    term,
  )}&limit=${limit}`;
  const options: RequestInit = {
    method: ApiMethod.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      return Promise.reject(error as Error);
    });
};
