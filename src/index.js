const express = require('express');
const {PORT} = require('./config/serverConfig.js');

function startAndSetupServer(){
    const app = express();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startAndSetupServer();