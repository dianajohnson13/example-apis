export const storeAuth = (data) => {
    localStorage.setItem('access', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
    localStorage.setItem('myId', data.user.userId);
}

export const getUserId = () => {
    localStorage.getItem('myId');
}

export const getAccessToken = () => {
    localStorage.getItem('access');
}

export const getRefreshToken = () => {
    localStorage.getItem('refresh');
}
