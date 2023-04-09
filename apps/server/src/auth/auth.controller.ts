import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'Google auth' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200 })
  async auth() {}

  @Get('google/callback')
  @ApiOperation({ summary: 'Google auth callback' })
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.status(HttpStatus.OK).send();
  }
}
