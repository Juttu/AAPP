export const isFormFieldValid = (form: any, name: string) => !!(form.touched[name] && form.errors[name]);
export const getFormErrorMessage = (form: any, name: string) => {
    return isFormFieldValid(form, name) && form.errors[name];
};