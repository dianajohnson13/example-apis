export const storeAuth = (data) => {
    localStorage.setItem('access', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
    localStorage.setItem('me', data.userId);
}

export const getUserId = () => {
    localStorage.getItem('me');
}

export const getAccessToken = () => {
    localStorage.getItem('access');
}

export const getRefreshToken = () => {
    localStorage.getItem('refresh');
}
