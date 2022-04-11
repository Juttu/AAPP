import React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {getFormErrorMessage, isFormFieldValid} from "utils/formik.util";


function PhoneInput({ onSubmit }: { onSubmit: (phone: string) => void }) {

    const formik = useFormik({
        initialValues: {
            code: '+91',
            phone: '',
        },
        validate: values => {
            const errors: Record<string, string> = {};
            if (!values.phone) {
                errors.phone = 'Please enter your phone number';
            } else if (values.phone.length !== 10) {
                errors.phone = 'Phone number must be 10 digits';
            }
            return errors;
        },
        onSubmit: (values) => {
            onSubmit(values.code + values.phone);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-column align-items-center mx-2">
            <div className="field p-inputgroup">
                <span className="p-inputgroup-addon bg-primary">+91</span>
                <InputText style={{height:'45px'}} id="phone" name="phone" placeholder="Phone*" value={formik.values.phone}
                           onChange={formik.handleChange} autoFocus
                           className={classNames({'p-invalid': isFormFieldValid(formik, 'phone')})}/>
                <Button className="hidden lg:block" label="Get early access" type="submit"/>
            </div>
            <Button className="block lg:hidden" label="Get early access" type="submit"/>
            <small className="p-error">{getFormErrorMessage(formik, 'phone')}</small>
            <div style={{color:"#DCDCDC",textAlign:"center",fontSize:"10px"}} className="text-center lg:text-left"><h1>Get a chance to win an amazing stock just by joining the waitlist</h1> </div>

</form>
    )
}

export default PhoneInput;