import express, { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

const liniter_generate_otp = rateLimit({
   windowMs: 1 * 60 * 1000, // 1 minute
   max: 3, // Limit each IP to 3 requests per windowMs
   message: "Too many requests, please try again after a 60s.",
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const Limiter_reset_password = rateLimit({
   windowMs: 1 * 60 * 1000, // 1 minute
   max: 5, // Limit each IP to 5 requests per windowMs
   message: "Too many requests, please try again after a 60s.",
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const otpStore: Record<string, string> = {};

app.get('/see-otp',(req:Request,res:Response) => {
   res.json(otpStore)
})


app.post('/generate-otp',liniter_generate_otp, (req, res):any => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); 
  res.status(200).json({ message: "OTP generated and logged" });
});


app.post('/reset-password',Limiter_reset_password, async (req:any, res:any) => {
  const { email, otp, newPassword,token } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  let formData = new FormData();
  formData.append("secret", '0x4AAAAAABDy0bIbwq1pUSwWcBSgpoCVMZQ');
  formData.append("response", token);


  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });
  if (result && otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email];
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    res.status(401).json({ message: "Invalid OTP or token " });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});