import { Controller, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Response } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 

    @Post('/register')
    create(@Body() registerData: RegisterDTO) {
      return this.authService.register(registerData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
      const tokens = await this.authService.createSession(req.user);
      res.cookie('auth', tokens, { httpOnly: true });
      res.send({
        message: 'success',
      });
    }

    @UseGuards(LocalAuthGuard)
    @Delete('logout')
    async logout( @Response() res) {
      res.clearCookie('auth', { httpOnly: true });
      res.send({
        message: 'success',
      });
    }
}
