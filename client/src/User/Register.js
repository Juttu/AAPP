import React from "react";
import {useFormik} from "formik";
import {registerUser} from "../services/user.service";
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";

function Register({ onRegistrationSuccess }) {

    const ref = React.useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await registerUser(values);
                if (response.status === 201) {
                    onRegistrationSuccess([{severity: 'success', summary: 'Success', detail: 'Details updated successfully'}]);
                }
            } catch (e) {
                onRegistrationSuccess([{severity: 'error', summary: 'Error', detail: 'Error updating details'}]);
            }
        },
    })

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <React.Fragment>
            <Toast ref={ref} />
            <form onSubmit={formik.handleSubmit} className="flex flex-column col-4 align-items-center">
                <div className="field">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-user" />
                        <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                    </span>
                    {getFormErrorMessage('name')}
                </div>
                <div className="field">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                    </span>
                    {getFormErrorMessage('email')}
                </div>
                <Button type="submit" label="Submit" className="mt-2 w-min" />
            </form>
        </React.Fragment>
    )
}

export default Register;