import { Signer } from '@ethersproject/abstract-signer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Wallet, providers } from 'ethers';
import { Request } from 'express';

@Injectable()
export class EthersService {
  private readonly deployerKey: string;
  private readonly infuraKey: string;
  private readonly network: string;

  constructor(
    private readonly config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.deployerKey = config.getOrThrow('ETHERS_DEPLOYER_PRIVATE_KEY');
    this.infuraKey = config.getOrThrow('ETHERS_INFURA_API_KEY');
    this.network = config.getOrThrow('ETHERS_DEPLOYED_NETWORK');
  }

  client(): Signer {
    const provider = new providers.InfuraProvider(this.network, this.infuraKey);
    return new Wallet(this.deployerKey, provider);
  }
}
