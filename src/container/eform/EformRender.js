import React, { memo, useCallback } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import GetFormElement from '../../components/GetFormElement';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { diagnoseFormSchema, accidentFormSchema, formSchema } from './schema';
import DiagnosesRender from './child/DiagnosesRender';
import AccidentsRender from './child/AccidentsRender';

const EformRender = ({ validateSchema }) => {
  const fields = useFormik({
    initialValues: formSchema,
    validationSchema: validateSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      alert("success, check log for data result")
      console.warn('RESULT::', values);
    },
  });
  // console.log("DEBUG", fields)

  const getFirstName = fields.values.firstName;
  const getDate = fields.values.date;
  const getFruit = fields.values.fruit;
  
  const changeDisableRequiredLogic = useCallback(async (e) => {
    const { id } = e.target;
    const { firstName, date, fruit } = fields.values;
    console.log("-> onKeyup parent", id, e.target, date, fields)

    switch(id){
      case "firstName":
        await fields.setFieldValue(
          `lastName.disable`,
          firstName.value !== '' ? false : true
        );
        fields.setFieldValue(
          `lastName.required`,
          firstName.value !== '' ? true : false
        );
      case "date":
        await fields.setFieldValue(
          `hobi.disable`,
          date.value !== '' ? false : true
        );
        fields.setFieldValue(
          `hobi.required`,
          date.value !== '' ? true : false
        );
      case "fruit":
        await fields.setFieldValue(
          `email.disable`,
          fruit.value !== '' ? false : true
        );
        fields.setFieldValue(
          `email.required`,
          fruit.value !== '' ? true : false
        );
      default:
        return null
    };
  },[ getFirstName.value, getFruit.value, getDate.value ]);

  const resetFormHandler = useCallback(() => {
    fields.values["fruit"].value = ""
    fields.resetForm()
  }, []);

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
                return <GetFormElement
                  key={fieldIndex}
                  disable={currentDefaultField.disable}
                  label={currentDefaultField.label}
                  id={currentDefaultField.id}
                  name={`${field}.value`} // => path obj for store/save value
                  placeholder={currentDefaultField.placeholder}
                  onKeyUp={changeDisableRequiredLogic}
                  type={currentDefaultField.type}
                  options={currentDefaultField.options}
                  onChange={fields.handleChange}
                  onChangeNotFormElement={(value) => {
                    fields.values[field].value = value // <= for populate field || force assign value
                    // fields.setFieldValue(`${field}.value`, value)
                    console.log("onChangeNotFormElement", field, value, currentDefaultField, fields)
                  }}
                  // onBlurNotFormElement={(value) => {
                  //   fields.setFieldTouched(`${field}.value`, value)
                  //   console.log("onBlurNotFormElement", field, fields)
                  // }}
                  onSelect={changeDisableRequiredLogic}
                  onBlur={fields.handleBlur}
                  value={currentDefaultField.value}
                  required={currentDefaultField.required}
                  validation={{
                    isError: !!fields.errors[field],
                    isTouched: !!fields.touched[field],
                    message: !!fields.errors[field] && fields.errors[field].value
                  }}
                />
            }
          })
        }
        <div style={{ display: "flex", width: "50%", alignSelf: "flex-end", marginTop: 99 }}>
          <button type="button" disabled={false} onClick={resetFormHandler} style={{ marginRight: 20 }}>Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </FormikProvider>
  );
}

const compare = ( prevProps, nextProps ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default memo(EformRender, compare);