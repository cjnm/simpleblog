const buildAuthHeaders = () => {
    const localUser = localStorage.getItem('simpleblog-user');
    if (localUser) {
        const { jwt, username, id } = JSON.parse(localUser);
        return {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'X-User-Id': id,
                'X-User-Username': username
            }
        }
    } else {
        return {
            headers: {}
        };
    }
}

export { buildAuthHeaders };