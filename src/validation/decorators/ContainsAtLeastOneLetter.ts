import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function ContainsAtLeastOneLetter(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: Object.assign({
        message: `${propertyName} must contain at least one letter`
      }, validationOptions),
      constraints: [],
      validator: {
        validate(value: any, _: ValidationArguments) {
          const pattern = /[a-zA-Z]/;
          return typeof value == "string" && pattern.test(value);
        }
      }
    });
  }
}