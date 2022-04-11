import React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {getFormErrorMessage, isFormFieldValid} from "utils/formik.util";


function OtpInput({ onSubmit }: { onSubmit: (otp: string) => void }) {

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validate: values => {
            const errors: Record<string, string> = {};
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

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-column align-items-center mx-2">
            <div className="field p-inputgroup">
                <InputText id="otp" name="otp" placeholder="OTP*" value={formik.values.otp} onChange={formik.handleChange} autoFocus
                           className={classNames({ 'p-invalid': isFormFieldValid(formik,'otp') })}/>
                <Button label="Proceed" type="submit"/>
            </div>
            <small className="p-error">{getFormErrorMessage(formik, 'otp')}</small>
        </form>
        
    )
}

export default OtpInput;