export const storeAuth = (data) => {
    if (data.accessToken) localStorage.setItem('access', data.accessToken);
    if (data.refreshToken) localStorage.setItem('refresh', data.refreshToken);
    if (data.userId) localStorage.setItem('myId', data.userId);
}

export const clearAuth = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('myId');
}

export const getUserId = () => {
    return localStorage.getItem('myId');
}

export const getAccessToken = () => {
    return localStorage.getItem('access');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh');
}
