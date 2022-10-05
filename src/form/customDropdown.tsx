import { FormControl, FormHelperText } from "@mui/material";
import { useField, Field, ErrorMessage, withFormik } from "formik";
import { Select } from "formik-mui";

type CustomDropdown = {
  name: string;
  label: string
}

const fieldOptions = [
  {value: "EMPTY", text: "Job Situation"}, 
  {value: "FULL", text: "Full-Time"}, 
  {value: "PART", text: "Part-Time"}, 
  {value: "UNEMPLOYED", text: "Unemployed"}, 
]

export function CustomDropdown({ name, label }: CustomDropdown) {
    const [field, props] = useField(name);
  
    return (
      <FormControl fullWidth error={!!props.error}>
        <Field
          component={Select}
          native
          name={name}
          poop="yes"
          inputProps={{
            id: 'job',
            'aria-errormessage': props.error ? 'job-error' : null,
          }}
        >
          {
            fieldOptions.map((opt, id) => (
              <option key={id} value={opt.value}>{opt.text}</option>
            ))
          }
        </Field>
      </FormControl>
    );
}