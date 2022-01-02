import React, { memo } from 'react';
import GetFormElement from '../../../components/GetFormElement';
import Button from '../../../components/Button';

const AccidentsRender = ({ fields, accident, accidentIndex, arrayHelpers }) => {
  return (
    <fieldset style={{ display: 'flex' }} key={`${accident}-${accidentIndex}`}>
      {
        Object.keys(accident).map((accidentChild, accidentChildIndex) => {
          const currenAccidenttField = fields.values['accidents'][accidentIndex][accidentChild]
          const props = {
            addStyle :{ marginRight: "15px" },
            key: `${accidentChild}-${accidentChildIndex}`,
            disable : currenAccidenttField.disable,
            label : currenAccidenttField.label,
            id : currenAccidenttField.id,
            name :`${'accidents'}[${accidentIndex}]${accidentChild}.value`, // => path obj for store/save value
            placeholder : currenAccidenttField.placeholder,
            type : currenAccidenttField.type,
            value : currenAccidenttField.value,
            required: currenAccidenttField.required,
            onKeyUp : () => {
              const { accidents } = fields.values;
              const getAccident = accidents[accidentIndex]['accident'].value;
              const getDate = accidents[accidentIndex]['date'].value;
              // handle change disable and required
              // after onchange value
              return (
                fields.setFieldValue(
                  `${'accidents'}[${accidentIndex}]${'doctorName'}.disable`,
                  getAccident !== '' && getDate !== '' ? false : true
                ),
                fields.setFieldValue(
                  `${'accidents'}[${accidentIndex}]${'doctorName'}.required`,
                  getAccident !== '' && getDate !== '' ? true : false
                )
              )
            },
            onChange: fields.handleChange,
            validation: {
              isError: fields.errors.hasOwnProperty('accidents') && 
                !!fields.errors["accidents"][accidentIndex] && 
                !!fields.errors["accidents"][accidentIndex][accidentChild],
              isTouched: fields.touched.hasOwnProperty('accidents') && 
                !!fields.touched["accidents"][accidentIndex] && 
                !!fields.touched["accidents"][accidentIndex][accidentChild],
              message: fields.errors.hasOwnProperty('accidents') && 
                !!fields.errors["accidents"][accidentIndex] && 
                !!fields.errors["accidents"][accidentIndex][accidentChild] && 
                fields.errors["accidents"][accidentIndex][accidentChild].value
            }
          };

          return GetFormElement(props)
        })
      }
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="button"
          onClick={() => arrayHelpers.remove(accidentIndex)}
          title={"Remove"}
        />
      </div>
    </fieldset>
  )
}

export default memo(AccidentsRender)