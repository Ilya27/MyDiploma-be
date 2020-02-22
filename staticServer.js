let express = require('express');
let config = require('./config');

function serve(directory = `./static`) {

    const app = express();
    app.use(express.static(directory));

    app.listen(config.staticServer.port, () => {
        console.log(`Api Documentation & media server listening at http://localhost:%s/apidoc`, config.staticServer.port);
    });
}

if (!module.parent) {
    serve();
} else {
    module.exports = serve;
}
