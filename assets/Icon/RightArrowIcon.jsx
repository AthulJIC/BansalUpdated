import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RightArrowIcon = ({ width, height, color }) => {
  return (
      <View style={{position:'absolute',
      right: 20, }}>
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Path
            d="M9 5L15 12L9 19"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
  );
};

export default RightArrowIcon;