export const storeAuth = (data) => {
    localStorage.setItem('access', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
    localStorage.setItem('myId', data.user.userId);
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
