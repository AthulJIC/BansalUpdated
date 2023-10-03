import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackButtonHandler = (navigation, isHomeScreen) => {
  useEffect(() => {
    const backAction = () => {
      if (isHomeScreen) {
        // If on the home screen, exit the app
        BackHandler.exitApp();
        return true;
      } else {
        // If not on the home screen, navigate to the home screen
        navigation.goBack(); // Replace 'Home' with the name of your home screen component
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