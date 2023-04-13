import { Get, Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with google auth code' })
  async googleExchangeCodeForToken(@Req() req, @Res() res: Response, @Body() body: { code: string }) {
    const token = await this.authService.exchangeCodeForToken(body.code);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: 'none',
      secure: true,
    });
    res.status(HttpStatus.OK).send();
  }

  @Get('validate')
  @ApiOperation({ summary: 'Validate cookie' })
  @UseGuards(JwtAuthGuard)
  async validateCookie(@Res() res: Response) {
    res.status(HttpStatus.OK).send();
  }
}
