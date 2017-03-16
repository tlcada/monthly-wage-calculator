'use strict';

import * as Koa from 'koa';
import config from '../config/config';
import router from './routes/routers';
import * as swagger from 'koa2-swagger-ui';
import * as serve from 'koa-static';
import * as cors from 'koa-cors';

// Creates the application
const app = new Koa();

if (config.env === 'development') {
    app.use(cors(['GET']));
}

// Assigns routes
app.use(serve('../client/dist'));
app.use(router.routes());
app.use(swagger(config.swagger));

// Check that application is not running yet
if (!module.parent){
    app.listen(config.port, () => {
        console.log(`Server started on port: ${config.port}`);
    });
}

module.exports = app;