import React from "react";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import {getFormErrorMessage, isFormFieldValid} from "utils/formik.util";
import UserService from "services/user.service";

function Register() {

    const userService: UserService = UserService.Instance;

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validate: values => {
            const errors: Record<string, string> = {};
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
            await userService.registerUser(values);
        },
    })

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit} className="flex w-full flex-column align-items-center">
                <div className="field flex flex-column">
                    <span className="p-float-label p-input-icon-right w-20rem">
                        <i className="pi pi-user"/>
                        <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange}
                                   autoFocus className={classNames({'p-invalid': isFormFieldValid(formik,'name')}, 'w-20rem')}/>
                        <label htmlFor="name"
                               className={classNames({'p-error': isFormFieldValid(formik, 'name')})}>Name*</label>
                    </span>
                    <small className="p-error">{getFormErrorMessage(formik, 'name')}</small>
                </div>
                <div className="field flex flex-column mt-4">
                    <span className="p-float-label p-input-icon-right w-20rem">
                        <i className="pi pi-envelope"/>
                        <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange}
                                   className={classNames({'p-invalid': isFormFieldValid(formik,'email')}, 'w-20rem')}/>
                        <label htmlFor="email"
                               className={classNames({'p-error': isFormFieldValid(formik, 'email')})}>Email*</label>
                    </span>
                    <small className="p-error">{getFormErrorMessage(formik, 'email')}</small>
                </div>
                <Button type="submit" label="Submit" className="mt-2 w-min"/>
            </form>
        </React.Fragment>
    )
}

export default Register;