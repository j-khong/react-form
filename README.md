This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

Auto generation of a form from specified fields

Fields are validated against specified criteria (validation rules)


```js
return (
        <Form
            fields={fields} // fields defining the form
            submit={onValidatedValues} // callback managing form validation with validated values
        />
    );
```
```js
const onValidatedValues = async (v: Values) => {
    try {
        // do what you want here with validated data
        console.log(v);
        return true;
    }
    catch (e) { return false; }
}

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
        render: TextBoxField,
        data: {
            id: "email",
            label: "Email",
            validations: [isRequired, isEmail]
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
    // ....
}
```