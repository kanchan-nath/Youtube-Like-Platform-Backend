import { UAParser } from "ua-parser-js"

const deviceInformation = (req, res, next) => {
    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.ip ||
        req.socket.remoteAddress

    const parser = new UAParser(req.headers["user-agent"])
    const result = parser.getResult()

    req.deviceInfo = {
        ip,
        browserName: result.browser.name,
        browserVersion: result.browser.version,
        osName: result.os.name,
        osVersion: result.os.version,
        deviceType: result.device.type || "desktop",
        timestamp: new Date()
    }
    next()
}

export { deviceInformation }
