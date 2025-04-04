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
const express_rate_limit_1 = require("express-rate-limit");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const liniter_generate_otp = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 requests per windowMs
    message: "Too many requests, please try again after a 60s.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const Limiter_reset_password = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again after a 60s.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const otpStore = {};
app.get('/see-otp', (req, res) => {
    res.json(otpStore);
});
app.post('/generate-otp', liniter_generate_otp, (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "OTP generated and logged" });
});
app.post('/reset-password', Limiter_reset_password, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, newPassword, token } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    let formData = new FormData();
    formData.append("secret", '0x4AAAAAABDy0bIbwq1pUSwWcBSgpoCVMZQ');
    formData.append("response", token);
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = yield fetch(url, {
        body: formData,
        method: "POST",
    });
    if (result && otpStore[email] === otp) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    else {
        res.status(401).json({ message: "Invalid OTP or token " });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
