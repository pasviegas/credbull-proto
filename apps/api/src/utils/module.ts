import { ConfigModule } from '@nestjs/config';

export const Config = {
  module: () => ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'] }),
};
