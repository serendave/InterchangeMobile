import * as React from 'react';
import Svg, { SvgProps, Rect, G, Path } from 'react-native-svg';

type ImagePlaceholderProps = SvgProps & {
  borderRadius?: number;
};

function ImagePlaceholder(props: ImagePlaceholderProps) {
  return (
    <Svg
      width={props.width ? props.width : 64}
      height={props.height ? props.height : 56}
      viewBox="0 0 64 56"
      fill="none"
      {...props}>
      <Rect
        x={0.5}
        y={0.5}
        width={63}
        height={55}
        rx={props.borderRadius ?? 3.5}
        fill="#fff"
        stroke="#E6E6FF"
        strokeLinejoin="round"
        strokeDasharray="4 2"
      />
      <G opacity={0.266} fill="#7676B4">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.826 9h46.28c.456 0 .826.37.826.826v36.348c0 .457-.37.826-.827.826H8.826A.826.826 0 018 46.174V9.826C8 9.37 8.37 9 8.826 9zm.827 36.348h44.626V10.652H9.653v34.696z"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.704 22.603c0 2.5-2.033 4.533-4.534 4.533a4.539 4.539 0 01-4.534-4.534c0-2.5 2.034-4.534 4.534-4.534a4.54 4.54 0 014.534 4.535zm-1.628 0a2.91 2.91 0 00-2.906-2.906 2.91 2.91 0 00-2.905 2.906 2.909 2.909 0 002.905 2.905 2.91 2.91 0 002.906-2.906z"
        />
        <Path d="M14.009 41.818a.825.825 0 00.546-.206l13.489-11.864 8.518 8.51a.827.827 0 001.17-1.168l-3.975-3.972 7.591-8.305 9.312 8.528a.828.828 0 001.168-.052.825.825 0 00-.051-1.167l-9.923-9.087a.829.829 0 00-1.17.052l-8.097 8.862-3.922-3.919a.828.828 0 00-1.132-.036l-14.07 12.378a.826.826 0 00.546 1.446z" />
      </G>
    </Svg>
  );
}

export default ImagePlaceholder;
