import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';

@Controller('hello')
@UseGuards(SimpleAuthGuard)
export class HelloController {

    @Get()
    @HttpCode(200)
    getHello(): string {
        return "HELLO WORLD!"
    }
}
