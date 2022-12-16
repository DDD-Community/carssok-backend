import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('hello')
export class HelloController {

    @Get()
    @HttpCode(200)
    getHello(): string {
        return "HELLO WORLD!"
    }
}
