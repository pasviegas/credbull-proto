import { Injectable } from '@nestjs/common';
import { User } from '@supabase/gotrue-js/src/lib/types';

@Injectable()
export class KycService {
  async status(user: User) {
    return user && 'active';
  }
}
