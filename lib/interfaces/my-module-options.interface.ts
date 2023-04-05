import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { MyOptions } from "./my-options.interface";

export interface MyOptionsFactory {
  config(): Promise<MyOptions> | MyOptions;
}

export interface MyModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<MyOptionsFactory>;
  useClass?: Type<MyOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MyOptions> | MyOptions;
  inject?: any[];
}
