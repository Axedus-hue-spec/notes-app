export const getAccessToken = () => {
    const token = localStorage.getItem('token');

    if(token) return token;

    if(!token) return null;
}