import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({
                          width = 84,
                          height = 64,
                          ...otherProps
                      }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 84 64"
        {...otherProps}
    >
        <Path
            d="M13 970.362a5 5 0 1 0 0 10h74a5 5 0 1 0 0-10zm0 27a5 5 0 1 0 0 10h74a5 5 0 1 0 0-10zm0 27a5 5 0 1 0 0 10h74a5 5 0 1 0 0-10z"
            overflow="visible"
            style={{
                color: "#000",
                textIndent: 0,
                textTransform: "none",
                direction: "ltr",
                baselineShift: "baseline",
                enableBackground: "accumulate",
            }}
            transform="translate(-8 -970.362)"
        />
    </Svg>
);

export default SvgComponent;
