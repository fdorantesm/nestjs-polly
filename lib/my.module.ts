import { DynamicModule, Module, Provider } from "@nestjs/common";

import { MY_MODULE_OPTIONS } from "./my.constants";
import { MyService } from "./my.service";
import {
  MyModuleAsyncOptions,
  MyOptionsFactory,
} from "./interfaces/my-module-options.interface";
import { MyOptions } from "./interfaces/my-options.interface";

@Module({
  providers: [MyService],
  exports: [MyService],
})
export class MyModule {
  static register(options: MyOptions): DynamicModule {
    return {
      module: MyModule,
      providers: [{ provide: MY_MODULE_OPTIONS, useValue: options }],
    };
  }

  static registerAsync(options: MyModuleAsyncOptions): DynamicModule {
    return {
      module: MyModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: MyModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: MyModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MY_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MyOptionsFactory) =>
        await optionsFactory.config(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
