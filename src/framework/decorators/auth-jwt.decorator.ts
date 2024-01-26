import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function AuthJwt() {
	return applyDecorators(
		ApiBearerAuth(),
		UseGuards(JwtAuthGuard)
	);
}
