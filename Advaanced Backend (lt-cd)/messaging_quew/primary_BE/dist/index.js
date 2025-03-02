"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
app.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { problem, userid, language, sol } = req.body;
        //add to the primary bg
        //eg : prisma.submitoions.create({data:{problem,userid,language,sol}})
        yield client.lPush('submition', JSON.stringify({ problem, userid, language, sol }));
        res.status(200).send('Submition added to the queue');
    }
    catch (err) {
        console.log("error while ading to quew" + err);
    }
}));
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Redis connected');
        app.listen(port, () => {
            console.log('Server running on port 3000');
        });
    }
    catch (err) {
        console.log(err);
    }
});
connect();
