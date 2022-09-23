const socketConfig = Object.freeze({
    url: process.env.NODE_ENV === 'production' ? 'https://sbca-server.herokuapp.com' : 'http://localhost:4000',
    options: {
        transports: ['websocket'],
    },
});

export default socketConfig;