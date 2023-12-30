import { IsEnum } from 'class-validator';

export enum Status {
  ACTIVE = 'active',
  PENDING = 'pending',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export class AccountStatusDto {
  @IsEnum(Status)
  status: Status;

  constructor(partial: Partial<AccountStatusDto>) {
    Object.assign(this, partial);
  }
}
