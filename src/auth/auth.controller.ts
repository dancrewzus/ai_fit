import { Controller, Post, Body, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { User } from 'src/app/users/entities/user.entity'
import { ErrorResponseDto } from 'src/common/dto/error-response.dto'
import { CreateUserDto } from 'src/app/users/dto'

import { LoginResponseDto } from './dto/login-response.dto'
import { GetUser } from './decorators/get-user.decorator'
import { Auth } from './decorators/auth.decorator'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged.', type: LoginResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. Email or password not satisfied some conditions.', type: ErrorResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials. Email or password are invalid.', type: ErrorResponseDto })
  @ApiResponse({ status: 500, description: 'Internal error.', type: ErrorResponseDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
  
  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered.', type: LoginResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. Email or password not satisfied some conditions.', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Not found exception. Primary role not found.', type: ErrorResponseDto })
  @ApiResponse({ status: 500, description: 'Internal error.', type: ErrorResponseDto })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Get('check-status')
  @Auth()
  checkAthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user)
  }

  @Get('private')
  @Auth()
  testPrivateRoute(
    @GetUser() user: User
  ) {
    return {
      message: "It's leviousa!",
      user,
    }
  }
}
