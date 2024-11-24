import * as React from "react";

const Delete = ({ width = "42", height = "32", ...props }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    width={width}   // Устанавливаем ширину через пропс
    height={height} // Устанавливаем высоту через пропс
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;}"
        }
      </style>
    </defs>
    <title />
    <g id="minus">
      <line className="cls-1" x1={7} x2={25} y1={16} y2={16} />
    </g>
  </svg>
);

export default Delete;
