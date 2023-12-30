import { Injectable } from '@nestjs/common';

import { EthersService } from '@/clients/ethers/ethers.service';
import { Status } from '@/modules/accounts/account-status.dto';

@Injectable()
export class KycService {
  constructor(private readonly ethers: EthersService) {}

  async status(address: string): Promise<Status> {
    return (await this.checkOnChain(address)) ? Status.ACTIVE : Status.REJECTED;
  }

  async checkOnChain(address: string): Promise<boolean> {
    return Boolean(address);
  }
}
