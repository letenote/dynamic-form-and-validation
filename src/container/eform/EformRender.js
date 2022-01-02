import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import GetFormElement from '../../components/GetFormElement';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { diagnoseFormSchema, accidentFormSchema, formSchema } from './schema';
import DiagnosesRender from './child/DiagnosesRender';
import AccidentsRender from './child/AccidentsRender';

const EformRender = ({ validate }) => {
  const fields = useFormik({
    initialValues: formSchema,
    validationSchema: validate,
    onSubmit: (values) => {
      alert("success, check log for data result")
      console.warn('RESULT::', values);
    },
  });
  // console.log("DEBUG", fields)
  return (
    <FormikProvider value={fields}>
      <form onSubmit={fields.handleSubmit} style={{ padding: 20, display: "flex", flexDirection: "column" }}>
        {
          Object.keys(fields.values).map((field, fieldIndex) => {
            switch (field) {
              case 'accidents':
                return (
                  <FieldArray
                    key={fieldIndex}
                    name="accidents"
                    render={(arrayHelpers) => (
                      <div>
                        <Divider/>
                        {
                          fields.values['accidents'].map((accident, accidentIndex) => {
                            return(
                              <AccidentsRender
                                key={accidentIndex}
                                fields={fields}
                                accident={accident}
                                accidentIndex={accidentIndex}
                                arrayHelpers={arrayHelpers}
                              />
                            )
                          })
                        }
                        <Button
                          type="button"
                          style={{ width: '100%', marginTop: '20px' }}
                          onClick={() => arrayHelpers.push(accidentFormSchema)}
                          title={"Add Accident"}
                        />
                      </div>
                    )}
                  />
                );
              case 'diagnoses':
                return (
                  <FieldArray
                    key={fieldIndex}
                    name="diagnoses"
                    render={(arrayHelpers) => (
                      <div>
                        <Divider/>
                        {
                          fields.values['diagnoses'].map((diagnose, diagnoseIndex) => {
                            return (
                              <DiagnosesRender
                                key={diagnoseIndex}
                                fields={fields}
                                diagnose={diagnose}
                                diagnoseIndex={diagnoseIndex}
                                arrayHelpers={arrayHelpers}
                              />
                            )
                          })
                        }
                        <Button
                          type="button"
                          style={{ width: '100%', marginTop: '20px' }}
                          onClick={() => arrayHelpers.push(diagnoseFormSchema)}
                          title={"Add Diagnose"}
                        />
                      </div>
                    )}
                  />
                );
              default:
                const currentDefaultField = fields.values[field];
                return GetFormElement({
                  key: fieldIndex,
                  disable: currentDefaultField.disable,
                  label: currentDefaultField.label,
                  id: currentDefaultField.id,
                  name: `${field}.value`, // => path obj for store/save value
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
            }
          })
        }
        <div style={{ display: "flex", width: "50%", alignSelf: "flex-end", marginTop: 99 }}>
          <button type="button" disabled={true} style={{ marginRight: 20 }}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default EformRender;