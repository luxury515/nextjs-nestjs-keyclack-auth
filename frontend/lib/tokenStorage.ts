export const setAccessToken = (token: string) => {
  sessionStorage.setItem('access_token', token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem('access_token');
};

export const removeAccessToken = () => {
  sessionStorage.removeItem('access_token');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refresh_token');
};