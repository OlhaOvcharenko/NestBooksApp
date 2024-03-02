import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 

    @Post('/register')
    create(@Body() registerData: RegisterDTO) {
      return this.authService.register(registerData);
    }

}
