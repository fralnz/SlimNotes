import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarIcon = ({ width = 32, height = 32, ...otherProps }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24" // Adjusting the viewBox to match the original SVG's aspect ratio
    {...otherProps}
  >
    <Path d="M18 2h-1V0h-2v2H5V0H3v2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H2V7h16z" />
  </Svg>
);

export default CalendarIcon;
