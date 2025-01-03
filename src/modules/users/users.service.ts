import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { pick } from 'lodash';

import { prefixText } from '@/lib/utils';

import type { User } from './user.type';

@Injectable()
export class UsersService {
  private management: ManagementClient;

  constructor(private readonly configService: ConfigService) {
    this.management = new ManagementClient({
      domain: this.configService.get('AUTH0_DOMAIN'),
      clientId: this.configService.get('AUTH0_CLIENT_ID'),
      clientSecret: this.configService.get('AUTH0_CLIENT_SECRET'),
      audience: this.configService.get('AUTH0_AUDIENCE')
    });
  }

  async getUser(id: string): Promise<User> {
    try {
      const auth0User = await this.management.users.get({ id });
      const user = {
        ...pick(auth0User.data, ['email', 'email_verified', 'name', 'picture']),
        id: prefixText(auth0User.data.user_id.split('|').pop(), 'usr'),
        provider: auth0User.data.user_id.split('|').shift(),
        provider_user_id: auth0User.data.user_id
      };

      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new UnauthorizedException('Unable to get user information');
    }
  }
}
