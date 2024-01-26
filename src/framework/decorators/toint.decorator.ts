import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export const ToInt = () => {
  return applyDecorators(
    Transform(({ value }) => Number(value)),
    IsInt(),
  );
};
