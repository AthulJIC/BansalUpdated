import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackButtonHandler = (navigation, isHomeScreen) => {
  useEffect(() => {
    const backAction = () => {
      if (isHomeScreen) {
        BackHandler.exitApp();
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, isHomeScreen]);
};

export default useBackButtonHandler;