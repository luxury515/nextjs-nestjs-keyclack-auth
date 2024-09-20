"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const dotenv = require("dotenv");
dotenv.config();
let AuthController = class AuthController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async login(loginData) {
        var _a;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(`${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, new URLSearchParams({
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                grant_type: 'password',
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                scope: 'openid',
                username: loginData.username,
                password: loginData.password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));
            return response.data;
        }
        catch (error) {
            const errorMessage = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || 'Login failed';
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map