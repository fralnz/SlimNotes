import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

export const ToDoIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <G>
      <Path d="M0,0h24v24H0V0z" fill="none" />
    </G>
    <G>
      <Path
        fill="white"
        d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M10,17H5v-2h5V17z M10,13H5v-2h5V13z M10,9H5V7h5V9z M14.82,15L12,12.16l1.41-1.41l1.41,1.42L17.99,9 l1.42,1.42L14.82,15z"
      />
    </G>
  </Svg>
);
