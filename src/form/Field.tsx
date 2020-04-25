import * as React from "react";
import { Errors, FormContext, TheFormContext, Values } from "./Form";
import { Validator } from './Validation'

export interface Fields {
    [key: string]:  Field<FieldProps>
}
type Field<T> = {
    render: React.FunctionComponent<T>,
    data: T
};

export interface FieldProps {
    // The unique field identifier
    id: string;
    label?: string;
    value?: any;
    validations: Validator[];
    options?: string[];
}

export const InfoField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {
            return (<div id={id}>{value}</div>);
        }
    );
};

export const TextBoxField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {
            return (<input
                id={id}
                type="text"
                value={value}
                onChange={
                    (e: React.FormEvent<HTMLInputElement>) =>
                        context && context.setValues({ [id]: e.currentTarget.value })
                }
                onBlur={() => context && context.validate(id)}
                className="form-control"

                style={context && getEditorStyle(context.errors, id)}
            />);
        }
    );
};

export const DateField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {
            return (
                <input
                    id={id}
                    type="date"
                    value={value}
                    onChange={
                        (e: React.FormEvent<HTMLInputElement>) =>
                            context && context.setValues({ [id]: e.currentTarget.value })
                    }
                    onBlur={() => context && context.validate(id)}
                    className="form-control"

                    style={context && getEditorStyle(context.errors, id)}
                />
            );
        }
    );
};



export const MultilineTextBoxField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {
            return (
                <textarea
                    id={id}
                    value={value}
                    onChange={
                        (e: React.FormEvent<HTMLTextAreaElement>) =>
                            context && context.setValues({ [id]: e.currentTarget.value })
                    }
                    onBlur={() => context && context.validate(id)}
                    className="form-control"
                    style={context && getEditorStyle(context.errors, id)}
                />
            );
        }
    );
};

export const DropdownField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    options,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {

            return (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={
                        (e: React.FormEvent<HTMLSelectElement>) =>
                            context && context.setValues({ [id]: e.currentTarget.value })
                    }
                    onBlur={() => context && context.validate(id)}
                    className="form-control"
                    style={context && getEditorStyle(context.errors, id)}
                >
                    {options &&
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                </select>
            );
        }
    );
};

const TemplateField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value
}, render: any) => {
    return (
        <TheFormContext.Consumer>
            {(context: FormContext | undefined) => (
                <div className="form-group">
                    {label && <label htmlFor={id}>{label}</label>}

                    {render(context)}

                    {context && getError(context.errors, id) && (
                        <div style={{ color: "red", fontSize: "80%" }}>
                            <p>{getError(context.errors, id)}</p>
                        </div>
                    )}
                </div>
            )}
        </TheFormContext.Consumer>
    );
};


const getEditorStyle = (errors: Errors, id: string): any => getError(errors, id) ? { borderColor: "red" } : {};
const getError = (errors: Errors, id: string): string => (errors ? errors[id] : "");


//
// WIP
//
export const DateRangeField: React.FunctionComponent<FieldProps> = ({
    id,
    label,
    value,
    validations
}) => {
    return TemplateField({ id, label, value, validations },
        (context: FormContext) => {
            const id1 = id + "-start-date"
            const id2 = id + "-end-date"
            return (<React.Fragment>
                <input
                    id={id1}
                    type="text"
                    value={value}
                    onChange={
                        (e: React.FormEvent<HTMLInputElement>) =>
                            context && context.setValues({ [id1]: e.currentTarget.value })
                    }
                    onBlur={() => context && context.validate(id1)}
                    className="form-control"

                    style={context && getEditorStyle(context.errors, id1)}
                />
                <input
                    id={id2}
                    type="text"
                    value={value}
                    onChange={
                        (e: React.FormEvent<HTMLInputElement>) =>
                            context && context.setValues({ [id2]: e.currentTarget.value })
                    }
                    onBlur={() => context && context.validate(id2)}
                    className="form-control"

                    style={context && getEditorStyle(context.errors, id2)}
                />
            </React.Fragment>
            );
            // <React.Fragment>
            //     <TextBoxField {...{ id: id + "start-date", label, value, validations }} />
            //     <TextBoxField {...{ id: id + "end-date", label, value, validations }} />
            // </React.Fragment>
        }
    );
};


interface DropdownFieldProps extends FieldProps {
    // The drop down items
    options: string[];
}