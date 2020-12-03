import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[()= #?!@$%^&*}{\[\]\-]).{8,}$/g;
        return regex.test(password);
    }

    defaultMessage() {
        return 'Password must be at least 8 characters and must contain at least one upper case, one lower case and one special character';
    }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}
