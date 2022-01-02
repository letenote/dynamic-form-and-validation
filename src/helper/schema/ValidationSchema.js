import * as Yup from "yup";

class ValidationSchema {
  static async generator( formSchema ){
    const yupSchema = await this.generateController(formSchema)
    const getSchema = await Yup.object(yupSchema)
    return getSchema
  }

  static async generateController(formSchema){
    let val = new Object();
    await Object.keys( formSchema ).forEach(async (form, formIndex) => {
      if(Array.isArray(formSchema[form])){
        await this.createArray(
          formSchema, 
          form, 
          (fieldSchema) =>  Object.assign(val, {[form] : fieldSchema })
        )
      }else{
        await this.createObject( 
          formSchema, 
          form, 
          (fieldSchema) =>  Object.assign(val, {[form] : fieldSchema })
        )
      };
    });
    return val
  }

  static async createObject( formSchema, form, callback ){
    let isValidationConditions = !!formSchema[form]["validationConditions"];
    let getValidationConditions = isValidationConditions ? formSchema[form]["validationConditions"] : null ;
    let getValidationType = formSchema[form]["validationType"];
    // begin validation 
    let validator = Yup[getValidationType]();
    await formSchema[form]["validations"].forEach((validation) => {
      const { params, type } = validation;
      if (!validator[type]) return;
      validator = validator[type](...params);
    });
    
    // begin when validation condition
    let fieldObjectSchema = Yup.object({ ['value']: validator });
    await isValidationConditions && getValidationConditions.forEach((condition) => {
      const { ref, is, then, type } = condition;
      if (!fieldObjectSchema[type]) return;
      fieldObjectSchema = fieldObjectSchema.when(ref, {
        is: is,
        then: Yup.object({
          value: Yup[then.validationType]()[then.type](...then.params)
        })
      });
    });
    callback(fieldObjectSchema)
  }

  static async createArray( formSchema, form, callback ){
    let fieldSchemaTemp = new Object()
    await formSchema[form].forEach(async ( formChild, formChildIndex ) => {
      await Object.keys(formChild).forEach(async (field, fieldIndex) => {
        let isValidationConditions = !!formChild[field]["validationConditions"]
        let getValidationConditions = isValidationConditions ? formChild[field]["validationConditions"] : null 
        let getValidationType = formChild[field]["validationType"];
        // begin validation 
        let validator = Yup[getValidationType]();
        await formChild[field]["validations"].forEach((validation) => {
          const { params, type } = validation;
          if (!validator[type]) return;
          validator = validator[type](...params);
        });

        // begin when validation condition
        let fieldArraySchema = Yup.object({ ['value']: validator  });
        if( !isValidationConditions ){
          Object.assign(fieldSchemaTemp, {  [field] : fieldArraySchema });
        }else{
          await getValidationConditions.forEach(( condition, conditionIndex ) => {
            const { ref, is, then, type } = condition;
            if (!fieldArraySchema[type]) return;
            fieldArraySchema = fieldArraySchema.when(ref, {
              is: is,
              then: Yup.object({
                value: Yup[then.validationType]()[then.type](...then.params)
              })
            })
            getValidationConditions.length === conditionIndex+1 && Object.assign(fieldSchemaTemp, {
              [field] : fieldArraySchema
            });
          });
        };
        
        Object.keys(formChild).length === fieldIndex+1 && callback(
          Yup.array().of(
            Yup.object(fieldSchemaTemp)
          )
        );
      });
    });
  }
}

export default ValidationSchema;