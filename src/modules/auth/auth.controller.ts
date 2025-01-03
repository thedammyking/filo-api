import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import type { User } from '@/modules/users/user.type';

@Controller('auth')
export class AuthController {
  @Get('/me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
