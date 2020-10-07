import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { ValidationError } from 'class-validator';
import { ErrorResponseDto } from './error.response.dto';

export class ValidationException extends UnprocessableEntityException {
    constructor(errors: (ValidationError | ErrorResponseDto)[]) {
        if (errors.length > 0 && errors[0] instanceof ValidationError) {
            errors = errors.map((validationError: ValidationError) => {
                const keys = Object.keys(validationError.constraints);
                for (const key of keys) {
                    return {
                        code: key,
                        message: validationError.constraints[key],
                    };
                }
            });
        }
        super({ errors, error: 'Validation Error' });
        this.name = 'ValidationError';
    }
}
