import React, { memo, useCallback } from 'react';
import GetFormElement from '../../../components/GetFormElement';
import Button from '../../../components/Button';

const DiagnosesRender = ({ fields, diagnose, diagnoseIndex, arrayHelpers }) => {
  const diagnoseOnKeyUpHandler = useCallback((e) => {
    const { id, tabIndex } = e.target;
    const getDiagnose = diagnose['diagnose'];
    console.log("-> onKeyup diagnoses", id, e.target)
    const handler = {
      diagnose: (
        fields.setFieldValue(
          `${'diagnoses'}[${tabIndex}]${'date'}.disable`,
          getDiagnose.value !== '' ? false : true
        ),
        fields.setFieldValue(
          `${'diagnoses'}[${tabIndex}]${'date'}.required`,
          getDiagnose.value !== '' ? true : false
        )
      )
    }
    return handler[id]
  }, [ diagnose['diagnose'].value ]);

  return(
    <fieldset
      style={{ display: 'flex' }}
      key={`${diagnose}-${diagnoseIndex}`}
    >
      {
        Object.keys( diagnose ).map(( diagnoseChild, diagnoseChildIndex ) => {
          const currentDiagnoseField = fields.values['diagnoses'][diagnoseIndex][diagnoseChild];
          const props = {
            addStyle: { marginRight: "15px" },
            key: `${diagnoseChild}-${diagnoseIndex}`,
            disable: currentDiagnoseField.disable,
            label: currentDiagnoseField.label,
            id: currentDiagnoseField.id,
            tabIndex: diagnoseIndex,
            name: `${'diagnoses'}[${diagnoseIndex}][${diagnoseChild}].value`, // => path obj for store/save value
            placeholder: currentDiagnoseField.placeholder,
            type: currentDiagnoseField.type,
            onKeyUp: diagnoseOnKeyUpHandler,
            onChange: fields.handleChange,
            value: currentDiagnoseField.value,
            required: currentDiagnoseField.required,
            validation: {
              isError: fields.errors.hasOwnProperty('diagnoses') && 
                !!fields.errors["diagnoses"][diagnoseIndex] && 
                !!fields.errors["diagnoses"][diagnoseIndex][diagnoseChild],
              isTouched: fields.touched.hasOwnProperty('diagnoses') && 
                !!fields.touched["diagnoses"][diagnoseIndex] && 
                !!fields.touched["diagnoses"][diagnoseIndex][diagnoseChild],
              message: fields.errors.hasOwnProperty('diagnoses') && 
                !!fields.errors["diagnoses"][diagnoseIndex] && 
                !!fields.errors["diagnoses"][diagnoseIndex][diagnoseChild] && 
                fields.errors["diagnoses"][diagnoseIndex][diagnoseChild].value
            }
          };

          return <GetFormElement {...props}/>
        })
      }
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="button"
          onClick={() => arrayHelpers.remove(diagnoseIndex)}
          title={"Remove"}
        />
      </div>
    </fieldset>
  )
}

export default memo(DiagnosesRender);