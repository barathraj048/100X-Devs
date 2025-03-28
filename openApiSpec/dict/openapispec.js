"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiSpec = void 0;
exports.openApiSpec = {
    "openapi": "3.0.0",
    "info": {
        "title": "User API",
        "version": "1.0.0",
        "description": "API to filter users by name"
    },
    "servers": [
        {
            "url": "http://localhost:3000"
        }
    ],
    "paths": {
        "/user": {
            "get": {
                "summary": "Get users filtered by name",
                "description": "Returns a list of users filtered by the 'name' query parameter.",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "schema": {
                            "type": "string"
                        },
                        "description": "The name to filter users by"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": { "type": "integer" },
                                            "name": { "type": "string" },
                                            "age": { "type": "integer" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
