import { PollyClient, PollyClientConfig } from '@aws-sdk/client-polly';
import {
  POLLY_MODULE_CONNECTION,
  POLLY_MODULE_CONNECTION_TOKEN
} from './polly.constants';

export function createPollyConnection(config: PollyClientConfig) {
  return new PollyClient(config);
}

export function getPollyConnectionToken(connection?: string): string {
  return `${
    connection || POLLY_MODULE_CONNECTION
  }_${POLLY_MODULE_CONNECTION_TOKEN}`;
}

export function getPollyOptionsToken(connection: string): string {
  return `${
    connection || POLLY_MODULE_CONNECTION
  }_${POLLY_MODULE_CONNECTION_TOKEN}`;
}
