import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

function AddPhoto(props: SvgProps) {
  return (
    <Svg width={64} height={56} viewBox="0 0 64 56" fill="none" {...props}>
      <Rect
        x={0.5}
        y={0.5}
        width={63}
        height={55}
        rx={3.5}
        fill="#fff"
        stroke="#E6E6FF"
        strokeLinejoin="round"
        strokeDasharray="4 2"
      />
      <Path
        d="M32 20v16M40 28H24"
        stroke="#9E78F3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AddPhoto;
