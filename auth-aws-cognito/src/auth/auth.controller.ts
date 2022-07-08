import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthenticateDtoOutput, AuthenticateEmailDtoInput } from './dto/authentication.dto';
import { AuthConfirmationDtoInput, AuthConfirmationDtoOutput } from './dto/confirm-signup.dto';
import { AuthRegisterDtoInput, AuthRegisterDtoOutput } from './dto/register.dto';
import { ResendVerifyRequestDtoInput, ResendVerifyRequestDtoOutput } from './dto/resend-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // @ApiOperation({ summary: 'Create user with aws cognito' })
  async register(
    @Body() authRegisterInput: AuthRegisterDtoInput
  ): Promise<AuthRegisterDtoOutput> {
    try {
      if (
        authRegisterInput.password.length < 8 ||
        !/[a-z]/.test(authRegisterInput.password) ||
        !/[A-Z]/.test(authRegisterInput.password) ||
        !/[0-9]/.test(authRegisterInput.password)
      ) {
        throw new BadRequestException('Password requirements not met.')
      }

      return await this.authService.register(authRegisterInput);

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // verify email address
  @Post('verify-email')
  async verifyPhoneNumber(
    @Body() authConfirmationInput: AuthConfirmationDtoInput
  ): Promise<AuthConfirmationDtoOutput> {
    return await this.authService.verifyEmail(authConfirmationInput);
  }

  // Resend code in email
  @Post('resend-verify-email')
  async resendVerifyPhone(
      @Body() resendVerifyEmailDto: ResendVerifyRequestDtoInput
  ): Promise<ResendVerifyRequestDtoOutput> {
      return await this.authService.resendVerifyEmail(resendVerifyEmailDto);
  }

  // Authentication by email 
  @Post('login-by-email')
  async authenticateByEmail(
    @Body() authenticationInput: AuthenticateEmailDtoInput,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthenticateDtoOutput> {
    const user = await this.authService.authenticateByEmail(authenticationInput);
    const secretData = user.token || user.cognito_userId;
    response.cookie('jwt', secretData, { httpOnly: true });

    return user;
  }
}
