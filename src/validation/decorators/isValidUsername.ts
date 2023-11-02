import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: Object.assign({
        message: `${propertyName} must contain only letters, numbers or '_' character`
      }, validationOptions),
      constraints: [],
      validator: {
        validate(value: any, _: ValidationArguments) {
          const pattern = /^\w+$/;
          return typeof value == "string" && pattern.test(value);
        }
      }
    });
  };
}