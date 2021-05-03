import React from 'react'
import {Field, ErrorMessage } from 'formik'
import { Form } from "semantic-ui-react";

/*
 Formik component which is used for short fields such as names and passwords.
 Text will be rendered hidden or visible depending on the showText parameter
*/
export const TextField = ({field, label, placeholder, showText}) => {
    return(
    <Form.Field>
        <Field placeholder={placeholder} type={showText ? 'text' : 'password' } {...field} />
        <div style={{color: 'red'}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
    )
};

