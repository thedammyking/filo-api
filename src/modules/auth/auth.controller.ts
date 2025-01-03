import { Controller, Get } from '@nestjs/common';

import { User } from '@/commons/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  @Get('/me')
  async me(@User() user: any) {
    return user;
  }
}
