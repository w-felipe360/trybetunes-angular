import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    console.log('requisição do user', req.user);
    const requisition = await this.authService.login(req.user);
    console.log('requisição do user', requisition);

    return requisition;
  }
}
