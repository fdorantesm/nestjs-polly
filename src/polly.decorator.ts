import { Inject } from '@nestjs/common';
import { getPollyConnectionToken } from './polly.tokens';

export const InjectPolly = (connection?) => {
  return Inject(getPollyConnectionToken(connection));
};
