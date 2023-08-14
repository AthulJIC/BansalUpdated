
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HeaderComponent from '../Components/Header';
import LoginScreen from '../Screens/Login';
// import RolesScreen from '../Screens/RolesPage/rolesPages';
import HomeScreen from '../Screens/Home/Home';
import OrderScreen from '../Screens/Orders/OrderScreen';
import Requests from '../Screens/Requests/Requests';
import History from '../Screens/History/History';
import Profile from '../Screens/Profile/Profile';
import Notification from '../Screens/Home/Notification';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const customSlideFromLeft = {
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateX = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0],
    });

    const slideFromLeft = { transform: [{ translateX }] };
    return { cardStyle: slideFromLeft };
  },
};

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Order" component={OrderScreen} /> */}
      <Tab.Screen name="Requests" component={Requests} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const NavigationLinks = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} 
            options={{
            headerShown: false, // Hide the header for Login screen
            }}/>
            <Stack.Screen name="Roles" component={RolesScreen}
              options={{
                headerShown: false, // Hide the header for Login screen
                }}/>
          </Stack.Navigator> */}
      <Stack.Navigator  initialRouteName="Home Screen"
      
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        ...customSlideFromLeft,
      }}>
        <Stack.Screen name="Home screen" component={MyTabs} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Notification" component={Notification}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLinks;