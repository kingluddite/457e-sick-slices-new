import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(event) {
    let { value, type, name } = event.target;
    // check if its a number
    if (type === 'number') {
      // convert it to a number to prevent coercian to string
      value = parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value,
    });
  }

  return { values, updateValues };
}
