import { Inject } from '@nestjs/common';
import { getPollyConnectionToken } from 'polly.connection';

export const InjectPolly = (connection?) => {
  return Inject(getPollyConnectionToken(connection));
};
