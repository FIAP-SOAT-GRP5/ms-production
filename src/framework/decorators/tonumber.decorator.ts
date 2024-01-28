import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export const ToNumber = () => {
	return applyDecorators(
		Transform(({ value }) => Number(value)),
		IsNumber()
	);
};
