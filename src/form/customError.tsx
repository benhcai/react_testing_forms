import { TextFieldProps, TextField } from "formik-mui";

export function CustomTextFieldWithErrorMessage(props: TextFieldProps) {
  const hasError = !!props.form.errors[props.field.name];

  const inputProps = hasError
    ? {
        ...props.inputProps,
        'aria-errormessage': `${props.field.name}-helper-text`,
      }
    : props.inputProps;

  return <TextField {...props} inputProps={inputProps} />;
}