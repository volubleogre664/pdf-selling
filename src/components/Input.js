import { useEffect, useState } from "react";

function Input({
  placeholder,
  type,
  name,
  id,
  onChange,
  value,
  required,
  capitalise,
}) {
  const [label, setLabel] = useState(false);

  useEffect(() => {
    if (value === "") setLabel(false);
    else setLabel(true);
  }, [value, setLabel]);

  return (
    <div className="input__wrapper duration-300 transition-all relative overflow-hidden pb-0 ">
      <input
        className={`outline-none text-sm font-poppins rounded-md border border-gray-400 border-solid transition-all px-3 w-full py-2 focus:border-2 focus:border-gray-600 ${
          label && "pt-6"
        } ${capitalise && "capitalize"}`}
        id={id}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
      />
      <label
        className={`px-3 py-0.5 w-full absolute top-0 left-0 z-10 text-xs text-gray-50 bg-gray-600 items-center rounded-t-md font-poppins ${
          label ? "flex" : "hidden"
        }`}
        htmlFor={id}
      >
        {placeholder}
      </label>
    </div>
  );
}

export default Input;
