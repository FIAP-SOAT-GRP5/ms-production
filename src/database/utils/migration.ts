/* v8 ignore start */
import { TableColumnOptions } from 'typeorm';

export const getIntId = (): TableColumnOptions => {
  return {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    isUnique: true,
    generationStrategy: 'increment',
    unsigned: true,
  };
};
/* v8 ignore stop */
