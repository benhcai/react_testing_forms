import {
    Box,
    Card,
    CardContent,
  } from '@mui/material';
  import {
    Field,
  } from 'formik';
  import {
    CheckboxWithLabel,
    TextField,
  } from 'formik-mui';
  import { mixed, number, object, string } from 'yup';

import { CustomDropdown } from './customDropdown';
import { CustomTextFieldWithErrorMessage } from './customError';
import { FormikStepper, FormikStep } from './formStep';
  
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

export interface FormValues {
  firstName: string;
  job: string;
  millionaire: boolean;
  money: number;
  description: string;
  city: string;
}

export interface MultiStepFormProps {
  onSubmit: (formValue: FormValues) => void;
}

export function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card sx={{width: "600px", maxWidth: "600px"}} >
        <CardContent >
          <FormikStepper<FormValues>
            initialValues={{
              firstName: '',
              job: 'EMPTY',
              city: '',
              millionaire: false,
              money: 0,
              description: '',
            }}
            onSubmit={async (values) => {
              await sleep(500);
              onSubmit(values);
            }}
          >
            <FormikStep 
              label="Personal Asses"
              validationSchema={object({
                firstName: string()
                  .required('Your First Name is Required')
                  .min(2, `Your name must be at least 2 characters`)
                  .max(15, `Your name can't be longer than 5 chars`),
                city: string().required().min(8).max(11),
                job: string()
                  .required('You need to select your job situation')
                  .not(['EMPTY'], 'You need to select your job situation'),
              })}
            >
              <Box paddingTop={2} paddingBottom={1}>
                <Field
                  id="firstName"
                  fullWidth
                  name="firstName"
                  // component={TextField}
                  component={CustomTextFieldWithErrorMessage}
                  label="First Name"
                />
              </Box>

              <Box paddingBottom={1}>
                <CustomDropdown name="job" label="Job Situation"/>
              </Box>

              <Box paddingBottom={1}>
                <Field
                  id="city"
                  fullWidth
                  name="city"
                  component={CustomTextFieldWithErrorMessage}
                  // component={TextField}
                  label="City"
                />
              </Box>

              <Box paddingBottom={2} width="100%">
                <Field
                  name="millionaire"
                  id="millionaire"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{ label: 'I am a millionaire' }}
                />
              </Box>
            </FormikStep>
            <FormikStep
              label="Ass Accounts"
              validationSchema={object({
                money: mixed().when('millionaire', {
                  is: true,
                  then: number()
                    .required()
                    .min(
                      1_000_000,
                      'Because you said you are a millionaire you need to have 1 million'
                    ),
                  otherwise: number().required(),
                }),
              })}
            >
              <Box paddingTop={2} paddingBottom={2}>
                <Field
                  fullWidth
                  name="money"
                  id="money"
                  type="number"
                  component={CustomTextFieldWithErrorMessage}
                  label="All the money I have"
                />
              </Box>
            </FormikStep>
            <FormikStep label="More Info">
              <Box paddingTop={2} paddingBottom={2}>
                <Field
                  fullWidth
                  id="description"
                  name="description"
                  component={TextField}
                  label="Description"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </Box>
  );
}





