import React from 'react';
import './App.css';

import { Form, Values } from "./form/Form";
import { Fields, FieldProps, TextBoxField, MultilineTextBoxField, DropdownField, InfoField, DateField } from "./form/Field";
import { IsRequired, IsEmail, maxLength, ValidationResponse, Validator } from "./form/Validation";

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <ExampleForm/>
        </header>
      </div>
    );
  }

  
export const ExampleForm: React.FunctionComponent = () => {
    const {isRequired, isEmail, isValidValue} = createValidators()

    const fields: Fields = {
        info: {
            render: InfoField,
            data: {
                id: "info",
                value: "populate the form",
                validations: []
            }
        },
        name: {
            render: TextBoxField,
            data: {
                id: "name",
                label: "Name",
                validations: [isRequired]
            }
        },
        email:{
            render:TextBoxField,
            data: {
                id: "email",
                label: "Email",
                validations: [isRequired, isEmail]
            }
        },
        choice:{
            render: DropdownField,
            data:{
                id:"choice",
                label:"your choice",
                value:"banana",
                options:['orange', 'banana'],
                validations: [isRequired]
            }
        },
        externalCheck: {
            render: TextBoxField,
            data: {
                id: "externalCheck",
                label: "data to be checked by external service",
                validations: [isRequired, isValidValue]
            }
        },
        date: {
            render: DateField,
            data: {
                id: "date",
                label: "Date",
                validations: [isRequired]
            }
        },
    }
    return (
        <Form
            fields={fields}
            // render={customRender(fields)}
            submit={async (v: Values) => {
                try {
                    // do what you want here with validated data
                    console.log(v);
                    return true;
                }
                catch (e) { return false; }
            }}
        />
    );
};
function customRender(fields:Fields){
    return () => (
            <React.Fragment>
                <div className="alert alert-info" role="alert">
                    Enter some information.
                </div>
                {fields.name.render({ ...fields.name.data })}
                {fields.externalCheck.render({ ...fields.externalCheck.data })}
                {fields.date.render({ ...fields.date.data })}
            </React.Fragment>
        );
}

class checkValueWithExternalService implements Validator {
    check(value: any): Promise<ValidationResponse> {
        return new Promise<ValidationResponse>(async (resolve: any, reject: any) => {
            const ret = await callToExternalService();
            resolve(new ValidationResponse(ret, ret ? "success" : "error with external service"));
        });
    }
}
function callToExternalService() : Promise<boolean>{
    return new Promise<boolean>( (resolve: any, reject: any) => {
        setTimeout(()=>{
            resolve(false);
        }, 2000);
    });
}

function createValidators(){
    return {
        isRequired: new IsRequired(),
        isEmail: new IsEmail(),
        isValidValue: new checkValueWithExternalService()
    };
}

export default App;