import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { MY_MODULE_OPTIONS } from './my.constants';
import { MyOptions } from './interfaces/my-options.interface';

@Injectable()
export class MyService {
  constructor(
    @Optional() @Inject(MY_MODULE_OPTIONS) private readonly options: MyOptions
  ) {
    Logger.log(`${MyService.name} initialized`, MyService.name);
  }
}
