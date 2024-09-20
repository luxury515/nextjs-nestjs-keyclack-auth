import { HttpService } from '@nestjs/axios';
export declare class AuthController {
    private httpService;
    constructor(httpService: HttpService);
    login(loginData: {
        username: string;
        password: string;
    }): Promise<any>;
}
