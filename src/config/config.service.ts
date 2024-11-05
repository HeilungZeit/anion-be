import * as fs from 'fs';
import * as path from 'path';

import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces/config-options.interface';
import { EnvConfig } from './interfaces/envconfig.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    // now it's working only for dev, change it to prod when it's become required
    const filePath = '.env';
    const envFile = path.resolve(
      __dirname,
      '../../../',
      options.folder,
      filePath,
    );

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
