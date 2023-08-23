import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AboutIcon = () => {
  return (
    <View>
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 20C5.28595 20 2.92893 20 1.46447 18.5355C0 17.0711 0 14.714 0 10C0 5.28595 0 2.92893 1.46447 1.46447C2.92893 0 5.28595 0 10 0C14.714 0 17.0711 0 18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20ZM10 15.75C10.4142 15.75 10.75 15.4142 10.75 15V9C10.75 8.58579 10.4142 8.25 10 8.25C9.58579 8.25 9.25 8.58579 9.25 9V15C9.25 15.4142 9.58579 15.75 10 15.75ZM10 5C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7C9.44771 7 9 6.55228 9 6C9 5.44772 9.44771 5 10 5Z"
          fill={"#B1292C"}
        />
      </Svg>
    </View>
  );
};

export default AboutIcon;