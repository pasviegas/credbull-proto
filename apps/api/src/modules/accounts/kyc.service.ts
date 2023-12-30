import { Injectable } from '@nestjs/common';

import { EthersService } from '@/clients/ethers/ethers.service';

@Injectable()
export class KycService {
  constructor(private readonly ethers: EthersService) {}

  async status(address: string) {
    return (await this.checkOnChain(address)) && 'active';
  }

  async checkOnChain(address: string): Promise<boolean> {
    return Boolean(address);
  }
}
