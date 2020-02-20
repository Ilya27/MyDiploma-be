describe('Global', () => {
    frisby.create('Should be get error 501 Not Implemented')
        .config(frisbyConfig)
        .get('/')
        .expectStatus(501)
        .toss();
});
