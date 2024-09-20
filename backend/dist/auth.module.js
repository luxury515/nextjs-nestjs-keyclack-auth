"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: 'http://10.5.34.131:9999',
                realm: 'bof-dfp',
                clientId: 'bof-dfp',
                secret: 'NqeOGG7YYLsbAupJfZiV2PR9KszOABYz',
            }),
        ],
        providers: [
            nest_keycloak_connect_1.AuthGuard,
            nest_keycloak_connect_1.ResourceGuard,
            nest_keycloak_connect_1.RoleGuard,
        ],
        exports: [nest_keycloak_connect_1.AuthGuard, nest_keycloak_connect_1.ResourceGuard, nest_keycloak_connect_1.RoleGuard],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map