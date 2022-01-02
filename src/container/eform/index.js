import React, { useEffect, useState } from 'react';
import { formSchema } from './schema';
import ValidationSchema from '../../helper/schema/ValidationSchema';
import EformRender from './EformRender';

const Eform = () => {
  const [ loading, setLoading ] = useState(true);
  const [ validate, setValidate ] = useState(null);

  useEffect(() => {
    const dataInit = async () => {
      const validationSchemaInit = await ValidationSchema.generator(formSchema);
      setTimeout(() => setValidate(validationSchemaInit), 3000);
    };

    dataInit();
  }, []);

  useEffect(() => {
    // customize callback after validate value is change, not null;
    validate !== null && setLoading(false)
  },[validate]);

  return loading
    ? <>Loading ..</>
    : <EformRender validate={validate}/>;
};

export default Eform;