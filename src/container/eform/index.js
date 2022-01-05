import React, { useEffect, useState } from 'react';
import { formSchema } from './schema';
import ValidationSchema from '../../helper/schema/ValidationSchema';
import sleep from '../../helper/sleep';
import EformRender from './EformRender';

const Eform = () => {
  const [ loading, setLoading ] = useState(true);
  const [ validateSchema, setValidateSchema ] = useState(null);

  useEffect(() => {
    const dataInit = async () => {
      const validationSchemaInit = await ValidationSchema.generator(formSchema);
      await sleep(3000);
      setValidateSchema(validationSchemaInit);
    };

    dataInit();
  }, []);

  useEffect(() => {
    // customize callback after validateSchema value is change, not null;
    validateSchema !== null && setLoading(false)
  },[validateSchema]);

  return loading
    ? <>Loading ..</>
    : <EformRender validateSchema={validateSchema}/>;
};

export default Eform;