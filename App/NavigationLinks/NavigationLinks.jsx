
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HeaderComponent from '../Components/Header';
import LoginScreen from '../Screens/login/Login';
// import RolesScreen from '../Screens/RolesPage/rolesPages';
import HomeScreen from '../Screens/Home/Home';
import OrderScreen from '../Screens/Orders/OrderScreen';
import Requests from '../Screens/Requests/Requests';
import History from '../Screens/History/History';
import Profile from '../Screens/Profile/Profile';
import Notification from '../Screens/Home/Notification';
import LanguageScreen from '../Screens/Profile/LanguageScreen';
import ContactScreen from '../Screens/Profile/ContactScreen';
import AboutScreen from '../Screens/Profile/AboutScreen';
import PrivacyScreen from '../Screens/Profile/PrivacyScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import HomeTabIcon from '../../assets/Icon/HomeTabIcon';
import HomeInactiveIcon from '../../assets/Icon/HomeInactiveIcon';
import RequestTabIcon from '../../assets/Icon/RequestTabIcon';
import HistoryTabIcon from '../../assets/Icon/HistoryTabIcon';
import HistoryInactiveIcon from '../../assets/Icon/HistoryInactiveIcon';
import ProfileTabIcon from '../../assets/Icon/ProfileTabIcon';
import ProfileInactiveIcon from '../../assets/Icon/ProfileInactiveIcon';
import RolesScreen from '../Screens/RolesPage/rolesPages';
import ForgetPasswordScreen from '../Screens/forgetpassword/ForgetPasswordScreen';
import OrderTabIcon from '../../assets/Icon/OrderTabIcon';
import OrderInactiveIcon from '../../assets/Icon/OrderInactiveIcon';
import PointsScreen from '../Screens/points/PointsScreen';
import PointsTabIcon from '../../assets/Icon/PointsTabIcon';
import PointsInactiveIcon from '../../assets/Icon/PointsInactiveIcon';
import RewardScreen from '../Screens/rewards/RewardScreen';
import RewardTabIcon from '../../assets/Icon/RewardTabIcon';
import RewardInactiveIcon from '../../assets/Icon/RewardInactiveIcon';


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

function MyTabs({route}) {
  const { role } = route?.params;
  console.log(role)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#B1292C',
      tabBarInactiveTintColor:'gray',
      tabBarStyle:[{
        display:'flex',
        backgroundColor:'black'
      }],
      tabBarIcon: ({ focused }) => {
        let iconComponent;

        if (route.name === 'Home') {
          iconComponent = focused ? (
            <HomeTabIcon color="#B1292C" size={27} />
          ) : (
            <HomeInactiveIcon/>
          );
        } 
        else if (route.name === 'Requests') {
          iconComponent = focused ? (
            <RequestTabIcon width={27} height={27} color="#B1292C" />
          ) : (
            <RequestTabIcon color='white' width={27} height={27}/>
          );
        }
        else if (route.name === 'History') {
          iconComponent = focused ? (
           <HistoryTabIcon height={29} width={29} color="#B1292C" />
          ) : (
            <HistoryInactiveIcon height={27} width={27} color='white'/>
          );
        }
        else if (route.name === 'Profile'){
          iconComponent = focused ? (
            <ProfileTabIcon height={27} width={27} color='#B1292C'/>
          ): (
            <ProfileInactiveIcon height={25} width={25} color='white'/>
          )
        }
        else if (route.name === 'Order'){
          iconComponent = focused ? (
            <OrderTabIcon height={27} width={27} color='#B1292C'/>
          ) : (
            <OrderInactiveIcon width={27} height={27}/>
          )
        }
        else if (route.name === 'Points'){
          iconComponent = focused ? (
            <PointsTabIcon />
          ) : (
            <PointsInactiveIcon/>
          )
        }
        else if (route.name === 'Reward'){
          iconComponent = focused ? (
            <RewardTabIcon height={27} width={27} color='#B1292C'/>
          ) : (
            <RewardInactiveIcon width={27} height={27} color='white'/>
          )
        }

        return iconComponent;
      },
    })}>
      {
        role === 'Distributor' ? (
        <>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Requests" component={Requests} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Profile" component={Profile} />
        </>
        ): (
          <>
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name='Order' component={OrderScreen}/>
          <Tab.Screen name='Points' component={PointsScreen} />
          <Tab.Screen name='Reward' component={RewardScreen} />
          <Tab.Screen name="Profile" component={Profile} />

          </>
        )
      }
      
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
        <Stack.Screen name="Login" component={LoginScreen} 
            options={{
            headerShown: false, // Hide the header for Login screen
        }}/>
        <Stack.Screen name="Roles" component={RolesScreen}
              options={{
                headerShown: false, // Hide the header for Login screen
        }}/>
        <Stack.Screen  name='ForgetPassword' component={ForgetPasswordScreen} options={{title: ''}}/>
        <Stack.Screen name="Home screen" component={MyTabs} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Notification" component={Notification} options={{
          title: 'Notifications',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }} />
          <Stack.Screen name='Language' component={LanguageScreen} 
          options={{
          title: 'Languages',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
          <Stack.Screen name='Contact' component={ContactScreen} options={{
          title: 'Contact Us',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
          
        }}/>
          <Stack.Screen name='About' component={AboutScreen} options={{
          title: 'About Us',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
          <Stack.Screen name='Privacy' component={PrivacyScreen} options={{
          title: 'Privacy Policy',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
        <Stack.Screen name='ProfileEdit' component={ProfileEditScreen} options={{
          title: 'User',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLinks;