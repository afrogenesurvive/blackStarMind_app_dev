import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    username: null,
    email: null,
    activity: null,
    prevAction1: null,
    prevAction2: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
