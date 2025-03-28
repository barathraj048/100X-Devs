"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapispec_1 = require("./openapispec");
const app = (0, express_1.default)();
const port = 3000;
let users = [
    { id: 1, name: "barath", age: 19 },
    { id: 2, name: "karthik", age: 20 },
];
app.get('/user', (req, res) => {
    let query = req.query.name;
    let filteredUsers = query ? users.filter((u) => u.name === query) : users;
    res.json(filteredUsers);
});
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapispec_1.openApiSpec));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
