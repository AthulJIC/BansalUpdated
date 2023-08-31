import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function AddressIcon() {
  return (
    <View>
      <Svg width={16} height={20} viewBox="0 0 16 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58172 0 0 4.00258 0 8.5C0 12.9622 2.55332 17.8124 6.53707 19.6744C7.46574 20.1085 8.53426 20.1085 9.46293 19.6744C13.4467 17.8124 16 12.9622 16 8.5C16 4.00258 12.4183 0 8 0ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
          fill="#B1292C"
        />
      </Svg>
    </View>
  );
}

export default AddressIcon;