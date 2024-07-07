import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BackIcon = ({ width = 32, height = 32, ...otherProps }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24" // Adjusting the viewBox to match the original SVG's aspect ratio
    {...otherProps}
  >
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

export default BackIcon;
