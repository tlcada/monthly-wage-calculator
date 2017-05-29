const environment = process.env.NODE_ENV || 'production';

const config = {
    port: process.env.PORT || 3000,
    env: environment,

    swagger: {
        routePrefix: '/api',
        swaggerOptions: {
            url: 'api-documentation',
            supportedSubmitMethods: ['get']
        }
    },

    logs : {
        rootFolder: 'logs',
        files: {
            error: 'error.log'
        }
    }
};

export default config;