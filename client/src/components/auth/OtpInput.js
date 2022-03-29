import React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";


function OtpInput({onSubmit}) {

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validate: values => {
            const errors = {};
            if (!values.otp) {
                errors.otp = 'Please enter the OTP sent to you!';
            } else if (values.otp.length !== 6) {
                errors.otp = 'OTP must be 6 digits long!';
            }
            return errors;
        },
        onSubmit: (values) => {
            onSubmit(values.otp);
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-column align-items-center">
            <div className="field p-inputgroup">
                <InputText id="otp" name="otp" placeholder="OTP*" value={formik.values.otp} onChange={formik.handleChange} autoFocus
                           className={classNames({ 'p-invalid': isFormFieldValid('otp') })}/>
                <Button className="p-button-help" label="Proceed" type="submit"/>
            </div>
            {getFormErrorMessage('otp')}
        </form>
    )
}

export default OtpInput;