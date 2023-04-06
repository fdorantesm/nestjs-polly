import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  PollyModuleAsyncOptions,
  PollyOptionsFactory
} from './interfaces/polly-module-options.interface';
import { PollyOptions } from './interfaces/polly-options.interface';
import {
  createPollyConnection,
  getPollyConnectionToken,
  getPollyOptionsToken
} from './polly.connection';
import { POLLY_MODULE_OPTIONS_TOKEN } from './polly.constants';

@Global()
@Module({})
export class PollyModule {
  static register(options: PollyOptions, connection?: string): DynamicModule {
    const pollyOptionsProvider: Provider = {
      provide: POLLY_MODULE_OPTIONS_TOKEN,
      useValue: options
    };

    const pollyConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useValue: createPollyConnection(options)
    };

    return {
      module: PollyModule,
      providers: [pollyOptionsProvider, pollyConnectionProvider]
    };
  }

  static registerAsync(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): DynamicModule {
    const s3ConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useFactory(options: PollyModuleAsyncOptions) {
        return createPollyConnection(options);
      },
      inject: [getPollyOptionsToken(connection)]
    };

    return {
      module: PollyModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: PollyModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: PollyModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: POLLY_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: POLLY_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory: PollyOptionsFactory) =>
        await optionsFactory.config(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
