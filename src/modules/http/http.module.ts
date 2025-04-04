import { Module } from '@nestjs/common';

import { HttpYumiService } from './http-yumi.service';

@Module({
  providers: [HttpYumiService],
  exports: [HttpYumiService],
})
export class HttpModule {}
