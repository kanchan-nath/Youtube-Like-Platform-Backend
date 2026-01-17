import nodemailer from "nodemailer"
import { ApiError } from "../utils/ApiError.js"
const transporter = nodemailer.createTransport({
    service: process.env.AUTH_SERVICE,
    host: process.env.SERVER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})

const sendDeviceInformation = async(
    email,
    browserName,
    browserVersion,
    osName,
    osVersion,
    deviceType,
    ip,
    timestamp
) => {
    try {
        await transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Welcome to Youtube like platform backend",
            text: "Welcome to Youtube like platform backend",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Notification</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
        <tr>
            <td align="center">
                <table width="600" style="background:#ffffff;border-radius:8px;">
                    <tr>
                        <td style="background:#4CAF50;padding:24px;text-align:center;color:#fff;">
                            <h2>New Login Detected</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px;color:#333;">
                            <p>A new login was detected on your account.</p>

                            <table width="100%" cellpadding="10" cellspacing="0" border="1">
                                <tr>
                                    <td><strong>Time</strong></td>
                                    <td>${timestamp}</td>
                                </tr>
                                <tr>
                                    <td><strong>IP Address</strong></td>
                                    <td>${ip}</td>
                                </tr>
                                <tr>
                                    <td><strong>Browser</strong></td>
                                    <td>${browserName} ${browserVersion}</td>
                                </tr>
                                <tr>
                                    <td><strong>Operating System</strong></td>
                                    <td>${osName} ${osVersion}</td>
                                </tr>
                                <tr>
                                    <td><strong>Device</strong></td>
                                    <td>${deviceType}</td>
                                </tr>
                            </table>

                            <p style="margin-top:20px;color:#856404;">
                                If this was not you, change your password immediately.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px;text-align:center;color:#888;font-size:12px;">
                            Automated security email. Do not reply.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
        })

    } catch (error) {
        throw new ApiError(400, "Device Information cannot send to email")
    }
}

export { sendDeviceInformation }
