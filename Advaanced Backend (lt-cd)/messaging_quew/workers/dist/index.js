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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Redis connected");
    }
    catch (err) {
        console.error("Redis connection error:", err);
    }
});
connect();
const processSubmissions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        while (true) {
            const response = yield client.rPop("submition");
            if (response) {
                console.log("submition response:", response);
            }
            yield new Promise((res) => setTimeout(res, 2000));
        }
    }
    catch (err) {
        console.error("Error processing submissions:", err);
    }
});
processSubmissions();
