const express = require('express');
const bodyParser = require('body-parser');
const {PORT,DB_SYNC} = require('./config/serverConfig.js');
const db = require('./models/index.js');

const apiRoutes = require('./routes/index.js');

function startAndSetupServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    if(DB_SYNC){
        db.sequelize.sync({alter:true});
    }
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startAndSetupServer();