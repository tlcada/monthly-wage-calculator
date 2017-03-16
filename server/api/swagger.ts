'use strict';

const url = require('url');

const api = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Monthly Wage Calculator API",
        "description": "Get a monthly wage of employees"
    },
    "host": url.host,
    "basePath": "/",
    "schemes": [
        "http",
        "https"
    ],
    "paths": {
        "/api/wage": {
            "get": {
                "tags": [
                    "wage"
                ],
                "summary": "Get a monthly wage of employees",
                "description": "Returns all wages",
                "operationId": "get_all_wages",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "404": {
                        "description": "can't find any result",
                        "schema": {
                            "$ref": "#/definitions/errorModel"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "errorModel": {
            "type": "object",
            "required": [
                "message"
            ],
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        }
    }
};

export default api;