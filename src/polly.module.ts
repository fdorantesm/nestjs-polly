import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  PollyModuleAsyncOptions,
  PollyOptionsFactory
} from './interfaces/polly-module-options.interface';
import {
  createPollyConnection,
  getPollyConnectionToken,
  getPollyOptionsToken
} from './polly.connection';
import { POLLY_MODULE_OPTIONS_TOKEN } from './polly.constants';
import { PollyOptions } from './interfaces/polly-options.interface';

@Global()
@Module({})
export class PollyModule {
  static register(options: PollyOptions, connection?: string): DynamicModule {
    const pollyOptionsProvider: Provider = {
      provide: getPollyOptionsToken(connection),
      useValue: options
    };

    const pollyConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useValue: createPollyConnection(options)
    };

    const providers = [pollyOptionsProvider, pollyConnectionProvider];

    return {
      module: PollyModule,
      exports: providers,
      providers
    };
  }

  static registerAsync(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): DynamicModule {
    const pollyConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useFactory(options: PollyModuleAsyncOptions) {
        return createPollyConnection(options);
      },
      inject: [getPollyOptionsToken(connection)]
    };

    const providers = [
      ...this.createAsyncProviders(options, connection),
      pollyConnectionProvider
    ];

    return {
      module: PollyModule,
      imports: options.imports || [],
      exports: providers,
      providers
    };
  }

  private static createAsyncProviders(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }
    return [
      this.createAsyncOptionsProvider(options, connection),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (options.useFactory) {
      return {
        provide: getPollyOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: getPollyOptionsToken(connection),
      useFactory: async (optionsFactory: PollyOptionsFactory) =>
        await optionsFactory.config(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
