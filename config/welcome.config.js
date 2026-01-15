import nodemailer from "nodemailer"
import { asyncHandeler } from "../utils/asyncHandeler.js";

const transporter = nodemailer.createTransport({
    service: process.env.AUTH_SERVICE,
    host: process.env.SERVER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
});

const welcomeMsg = asyncHandeler(async(email, userName)=>{
  await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Welcome to Youtube like platform backend",
    text: "Welcome to Youtube like platform backend",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Our Platform!</h1>
    </div>
    
    <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #333333; margin: 0 0 20px 0;">Hi ${userName},</h2>
      
      <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
        Thank you for joining us! We're thrilled to have you on board.
      </p>
      
      <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
        Your account has been successfully created with the email: <strong style="color: #667eea;">${email}</strong>
      </p>
      
      <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        You can now explore all the features and make the most of your experience with us.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://kanchannath.hashnode.dev/" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Get Started</a>
      </div>
      
      <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; border-top: 1px solid #eeeeee; padding-top: 20px;">
        If you have any questions, feel free to reach out to our support team.
      </p>
      
      <p style="color: #999999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
        © 2026 Your Company. All rights reserved.
      </p>
    </div>
  </div>
`,
  })
})
export { welcomeMsg }