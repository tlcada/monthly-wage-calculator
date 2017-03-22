'use strict';

import WageCalculation from '../calculation/wageCalculation';
import * as Router from 'koa-router';
import apiDocumentation from '../../api/swagger';
import LoggerClass from '../logger/logger';

const logger = new LoggerClass();
const wageCalculation = new WageCalculation();
const router = new Router({prefix: '/api'});

// GET monthly wage
router.get('/wage', async (ctx, next) => {
    try {
        ctx.body = await wageCalculation.getMonthlyWage();
    } catch (err) {
        logger.error('Error occurred', {details: err.message});
        ctx.status = 404;
        ctx.body = {'message': 'no results found'};
    }
});

// Url and swagger routePrefix is specified in the config file
router.get('/api-documentation', async (ctx, next) => {
    ctx.body = await apiDocumentation;
});

export default router;