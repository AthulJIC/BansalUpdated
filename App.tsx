import NavigationLinks from './App/NavigationLinks/NavigationLinks';
import { AppProvider } from './App/context/AppContext';
import { NavigationContainer, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { navigationRef } from './App/providers/RootNavigator'



export default function App() {
  return (
    <AppProvider>
      <NavigationContainer ref={navigationRef}>
          <NavigationLinks/>
      </NavigationContainer>
    </AppProvider>
  );
}