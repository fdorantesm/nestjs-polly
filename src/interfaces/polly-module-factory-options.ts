import { PollyModuleOptions } from './polly-module-options.interface';

export interface PollyOptionsFactory {
  createPollyModuleOptions(): Promise<PollyModuleOptions> | PollyModuleOptions;
}
