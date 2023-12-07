export const storeTokens = (data) => {
    localStorage.setItem('access', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
}

export const getAccessToken = () => {
    localStorage.getItem('access');
}

export const getRefreshToken = () => {
    localStorage.getItem('refresh');
}
