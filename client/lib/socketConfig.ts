const socketConfig = Object.freeze({
    url: 'http://localhost:4000',
    options: {
        transports: ['websocket'],
    },
});

export default socketConfig;