function Loader() {
  let circleCommonClasses = "h-2.5 w-2.5 bg-gray-800 rounded-full";

  return (
    <div className="absolute z-20 bg-white-8 left-0 top-0 w-full h-full grid place-items-center">
      <div className="flex w-fit items-center justify-center">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
}

export default Loader;
