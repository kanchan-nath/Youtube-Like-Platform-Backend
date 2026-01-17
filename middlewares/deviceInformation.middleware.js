import UAParser from "ua-parser-js";
import { asyncHandeler } from "../utils/asyncHandeler";
import { parse } from "dotenv";
import { version } from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";

const deviceInformation = asyncHandeler(async(requestAnimationFrame, res)=>{
    const IP = req.ip || req.headers["x-forwarded-for"].split(",")[0] || req.connection.remoteAddress || req.socket.remoteAddress;

    const userAgentString = req.headers["user-agent"]

    const parser = new UAParser(userAgentString)
    const result = parser.getResult()

    const loginInfo = {
        ip: IP,
        browser:{
            name: result.browser.name,
            version: result.browser.version
        },
        os:{
            name: result.os.name,
            version: result.os.version,
        },
        device:{
            type: result.device.type || "desktop",
            vendor: result.device.vendor,
            model: result.device.model
        },
        timestamp: new Date()

        
    }
    console.log('Login Info:', loginInfo);

    return res
    .status(200)
    .jspn(new ApiResponse(200, loginInfo, "Device information send to email"))
})
export {deviceInformation}