import React from "react";

const Loader = () => {
  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />

        <circle cx="50" cy="10" r="7" fill="#3498db">
          {/* The animation element */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </>
  );
};

export default Loader;
