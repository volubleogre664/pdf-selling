function Button({ name, ...rest }) {
  return (
    <button
      className="py-3.5 w-full max-w-lg font-poppins bg-gray-800 text-gray-50 duration-300 rounded-md transition-all hover:bg-transparent border-2 border-solid hover:border-gray-800 hover:text-gray-800"
      {...rest}
    >
      {name}
    </button>
  );
}

export default Button;
