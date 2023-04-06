import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { PollyOptions } from './polly-options.interface';

export interface PollyOptionsFactory {
  config(): Promise<PollyOptions> | PollyOptions;
}

export interface PollyModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PollyOptionsFactory>;
  useClass?: Type<PollyOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PollyOptions> | PollyOptions;
  inject?: any[];
}
