import { Values } from './Form'

export class ValidationResponse {
    constructor(public validated: boolean, public message: string) { }
}

export interface Validator {
    check(value: any): Promise<ValidationResponse>;
}

export class IsRequired implements Validator {
    check(value: any): Promise<ValidationResponse> {
        return new Promise<ValidationResponse>((resolve: Resolver<ValidationResponse>, reject: Rejector) => {
            const resp =
                value == undefined ||
                    value === null ||
                    value === ""
                    ? new ValidationResponse(false, "This must be populated")
                    : new ValidationResponse(true, "");
            resolve(resp);
        });
    }
}

export class IsEmail implements Validator {
    check(value: any): Promise<ValidationResponse> {
        return new Promise<ValidationResponse>((resolve: Resolver<ValidationResponse>, reject: Rejector) => {
            const resp =
                value && value.search(
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                )
                    ? new ValidationResponse(false, "This must be in a valid email format")
                    : new ValidationResponse(true, "");
            resolve(resp);
        });
    }
}

type Resolver<T> = (value?: T | PromiseLike<T>) => void;
type Rejector = (reason?: any) => void;

//
// WIP
//

export const maxLength = (
    values: Values,
    fieldName: string,
    length: number
): string =>
    values[fieldName] && values[fieldName].length > length
        ? `This can not exceed ${length} characters`
        : "";

