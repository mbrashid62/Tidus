// eslint-disable no-undef
export let spotifyCredentials = {
    clientId: 'b3295b28bbbd4d598f32515c7fdad7bf',
    scope: 'user-read-private user-read-email',
    redirect_uri: process.env.NODE_ENV === 'development' ? 'http://www.localhost:3000/callback' : 'https://tidus-music.herokuapp.com/callback',
    state: 'my-state'
};

export let wrapperCredentials = {
    clientId: 'b3295b28bbbd4d598f32515c7fdad7bf',
    clientSecret: '564da0f10a104edd9ca4f0aabb479ea0',
    redirectUri: 'http://www.localhost:3000/callback'
};
