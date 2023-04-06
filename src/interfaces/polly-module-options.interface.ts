import { PollyClientConfig } from '@aws-sdk/client-polly';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { PollyOptionsFactory } from './polly-module-factory-options';

export interface PollyModuleOptions extends PollyClientConfig {}

export interface PollyModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PollyOptionsFactory>;
  useClass?: Type<PollyOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PollyModuleOptions> | PollyModuleOptions;
  inject?: any[];
}
