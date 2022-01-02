import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import { formData } from './schema';
import GetFormElement from '../../components/GetFormElement';
import Button from '../../components/Button';
import * as Yup from 'yup';

const Login = () => {
  const fields = useFormik({
    initialValues: formData,
    validationSchema: Yup.object().shape({
      email: Yup.object().shape({
        value: Yup.string().required('Ga boleh kosong').email('Invalid email format')
      }),
      password: Yup.object().shape({
        value: Yup.string().required()
                .min(8, 'Should more than 8 characters')
                .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
                .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
                .matches(/[0-9]/g, 'Should contain at least 1 number')
                .matches(/^\S*$/, 'Should not contain spaces'),
      })
    }),
    onSubmit: (values) => {
      console.warn('RESULT::', values);
    },
  })
  return(
    <div>
      <div className="login-box">
        <FormikProvider value={fields}>
        {console.log('formik:', fields)}
          <form onSubmit={fields.handleSubmit} style={{ padding: 20 }}>
            {
              Object.keys( fields.values ).map(( field, fieldIndex ) => {
                const currentDefaultField = fields.values[field];
                
                return GetFormElement({
                  key: fieldIndex,
                  disable: currentDefaultField.disable,
                  label: currentDefaultField.label,
                  id: currentDefaultField.id,
                  name: currentDefaultField.targetValue, // => path obj for store/save value
                  placeholder: currentDefaultField.placeholder,
                  type: currentDefaultField.type,
                  onChange: fields.handleChange,
                  onBlur: fields.handleBlur,
                  value: currentDefaultField.value,
                  required: currentDefaultField.required,
                  validation: {
                    isError: !!fields.errors[field],
                    isTouched: !!fields.touched[field],
                    message: !!fields.errors[field] && fields.errors[field].value
                  }
                }); 
              })
            }
            <Button type="submit" title={"Login"} style={{ marginTop: 25 }}/>
          </form>
        </FormikProvider>
      </div>
    </div>
  )
}

export default Login