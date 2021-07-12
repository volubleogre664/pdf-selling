import { useEffect, useState } from "react";

function TextArea({
  placeholder,
  name,
  id,
  onChange,
  value,
  required,
  onKeyDown,
}) {
  const [label, setLabel] = useState(false);

  useEffect(() => {
    if (value === "") setLabel(false);
    else setLabel(true);
  }, [value, setLabel]);

  return (
    <div className="textarea__wrapper duration-300 transition-all relative overflow-hidden pb-0 ">
      <textarea
        className={`outline-none h-40 text-sm font-poppins rounded-md border border-gray-400 border-solid transition-all px-3 w-full resize-none py-2 focus:border-2 focus:border-gray-600 ${
          label && "pt-6"
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
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

export default TextArea;
