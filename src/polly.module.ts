import { DynamicModule, Module } from '@nestjs/common';
import {
  PollyModuleAsyncOptions,
  PollyModuleOptions
} from './interfaces/polly-module-options.interface';
import { PollyCoreModule } from './polly.core-module';

@Module({})
export class PollyModule {
  static forRoot(
    options: PollyModuleOptions,
    connection?: string
  ): DynamicModule {
    return {
      global: true,
      module: PollyModule,
      imports: [PollyCoreModule.forRoot(options, connection)],
      exports: [PollyCoreModule]
    };
  }

  static async forRootAsync(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Promise<DynamicModule> {
    return {
      global: true,
      module: PollyModule,
      imports: [PollyCoreModule.forRootAsync(options, connection)],
      exports: [PollyCoreModule]
    };
  }

  /**
   * @deprecated Use forRootAsync method instead. This method will be removed next version.
   */
  static async registerAsync(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Promise<DynamicModule> {
    return this.forRootAsync(options, connection);
  }
}
