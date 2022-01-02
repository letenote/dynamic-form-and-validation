import React, { memo } from 'react';
import GetFormElement from '../../../components/GetFormElement';
import Button from '../../../components/Button';

const DiagnosesRender = ({ fields, diagnose, diagnoseIndex, arrayHelpers }) => {
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
            name: `${'diagnoses'}[${diagnoseIndex}][${diagnoseChild}].value`, // => path obj for store/save value
            placeholder: currentDiagnoseField.placeholder,
            type: currentDiagnoseField.type,
            onKeyUp : () => {
              // handle change required
              // after onchange value diagnose
              const { diagnoses } = fields.values;
              const getDiagnose = diagnoses[diagnoseIndex]['diagnose'].value;
              return fields.setFieldValue(
                `${'diagnoses'}[${diagnoseIndex}]${'date'}.required`,
                getDiagnose !== '' ? true : false
              )
            },
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

          return GetFormElement(props)
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