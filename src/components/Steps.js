import React from "react";

function Steps({ items, active }) {
  return (
    <div className="mb-3 text-center text-sm font-poppins font-light text-gray-800">
      <p>
        {/* Making the breadcrumb steps */}
        {items.map(
          (item, i) =>
            (i === +active - 1 && (
              <strong>{item + (i === items.length - 1 ? "" : " > ")}</strong>
            )) || <span>{item + (i === items.length - 1 ? "" : " > ")}</span>
        )}
      </p>
    </div>
  );
}

export default Steps;
