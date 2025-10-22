var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
function isPortAvailable(port) {
    return new Promise(function (resolve) {
        var server = net.createServer();
        server.listen(port, function () {
            server.close(function () { return resolve(true); });
        });
        server.on("error", function () { return resolve(false); });
    });
}
function findAvailablePort() {
    return __awaiter(this, arguments, void 0, function (startPort) {
        var port;
        if (startPort === void 0) { startPort = 3000; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    port = startPort;
                    _a.label = 1;
                case 1:
                    if (!(port < startPort + 20)) return [3 /*break*/, 4];
                    return [4 /*yield*/, isPortAvailable(port)];
                case 2:
                    if (_a.sent()) {
                        return [2 /*return*/, port];
                    }
                    _a.label = 3;
                case 3:
                    port++;
                    return [3 /*break*/, 1];
                case 4: throw new Error("No available port found starting from ".concat(startPort));
            }
        });
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, server, preferredPort, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = express();
                    server = createServer(app);
                    // Configure CORS for mobile and cross-origin access
                    app.use(function (req, res, next) {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                        if (req.method === 'OPTIONS') {
                            return res.sendStatus(200);
                        }
                        next();
                    });
                    // Configure body parser with larger size limit for file uploads
                    app.use(express.json({ limit: "50mb" }));
                    app.use(express.urlencoded({ limit: "50mb", extended: true }));
                    // OAuth callback under /api/oauth/callback
                    registerOAuthRoutes(app);
                    // tRPC API
                    app.use("/api/trpc", createExpressMiddleware({
                        router: appRouter,
                        createContext: createContext,
                    }));
                    if (!(process.env.NODE_ENV === "development")) return [3 /*break*/, 2];
                    return [4 /*yield*/, setupVite(app, server)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    serveStatic(app);
                    _a.label = 3;
                case 3:
                    preferredPort = parseInt(process.env.PORT || "3000");
                    return [4 /*yield*/, findAvailablePort(preferredPort)];
                case 4:
                    port = _a.sent();
                    if (port !== preferredPort) {
                        console.log("Port ".concat(preferredPort, " is busy, using port ").concat(port, " instead"));
                    }
                    server.listen(port, function () {
                        console.log("Server running on http://localhost:".concat(port, "/"));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
startServer().catch(console.error);
