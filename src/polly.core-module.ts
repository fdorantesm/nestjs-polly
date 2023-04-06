import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { PollyModuleAsyncOptions, PollyModuleOptions } from './interfaces';
import {
  createPollyConnection,
  getPollyConnectionToken,
  getPollyOptionsToken
} from './polly.tokens';
import { PollyOptionsFactory } from './interfaces/polly-module-factory-options';

@Global()
@Module({})
export class PollyCoreModule {
  /* forRoot */
  static forRoot(
    options: PollyModuleOptions,
    connection?: string
  ): DynamicModule {
    const pollyOptionsProvider: Provider = {
      provide: getPollyOptionsToken(connection),
      useValue: options
    };

    const pollyConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useValue: createPollyConnection(options)
    };

    return {
      module: PollyCoreModule,
      providers: [pollyOptionsProvider, pollyConnectionProvider],
      exports: [pollyOptionsProvider, pollyConnectionProvider]
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: PollyModuleAsyncOptions,
    connection: string
  ): DynamicModule {
    const pollyConnectionProvider: Provider = {
      provide: getPollyConnectionToken(connection),
      useFactory(options: PollyModuleOptions) {
        return createPollyConnection(options);
      },
      inject: [getPollyOptionsToken(connection)]
    };

    return {
      module: PollyCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        pollyConnectionProvider
      ],
      exports: [pollyConnectionProvider]
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass }
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: PollyModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useFactory) {
      return {
        provide: getPollyOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: getPollyOptionsToken(connection),
      useFactory: async (
        optionsFactory: PollyOptionsFactory
      ): Promise<PollyModuleOptions> => {
        return await optionsFactory.createPollyModuleOptions();
      },
      inject: [options.useClass || options.useExisting]
    };
  }
}
