import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (onChangeEvent) => {
    switch (onChangeEvent.target.type) {
      case "file": {
        const [file] = onChangeEvent.target.files;

        if (!file) break;

        if (file.type === "application/pdf") {
          setValues({
            ...values,
            [onChangeEvent.target.name]: file?.name,
          });

          break;
        }

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          setValues({
            ...values,
            [onChangeEvent.target.name]: readerEvent.target.result,
          });
        };

        reader.readAsDataURL(file);

        break;
      }

      default:
        setValues({
          ...values,
          [onChangeEvent.target.name]: onChangeEvent.target.value,
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};
