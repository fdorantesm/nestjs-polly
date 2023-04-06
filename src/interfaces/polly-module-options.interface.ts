import { PollyClientConfig } from '@aws-sdk/client-polly';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface PollyModuleOptions extends PollyClientConfig {}

export interface PollyModuleOptionsFactory {
  createPollyModuleOptions(): Promise<PollyModuleOptions> | PollyModuleOptions;
}

export interface PollyModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PollyModuleOptionsFactory>;
  useClass?: Type<PollyModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PollyModuleOptions> | PollyModuleOptions;
  inject?: any[];
}
