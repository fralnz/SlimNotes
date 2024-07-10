import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const CheckIcon = ({ width = 32, height = 32, ...otherProps }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24" // Adjusting the viewBox to match the original SVG's aspect ratio
    {...otherProps}
  >
    <Path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);
