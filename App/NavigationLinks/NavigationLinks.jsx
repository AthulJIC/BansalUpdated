
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
import ConfirmDetailsScreen from '../Screens/Orders/ConfirmDetailsScreen';
import DistributorExpandScreen from '../Screens/Orders/DistributorExpandScreen';
import ConfirmPurchase from '../Screens/Orders/ConfirmPurchase';
import SuccessScreen from '../Screens/sucess/SucessScreen';
import AddressList from '../Screens/rewards/Address';
import ConfirmPage from '../Screens/rewards/confirm';

import { useRef } from 'react';
import FavouritesScreen from '../Screens/Profile/FavouritesScreen';


import Language from '../Language/LanguageSwitch';
import IdVerificationScreen from '../Screens/rewards/IdVerificationScreen';
import IdConfirmationScreen from '../Screens/rewards/IdConfirmationScreen';


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

  function ProfileScreen() {
    return <Profile role={role} />;
  }
  function HomeScreenTab(){
    return <HomeScreen role={role}/>
  }
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
        <Tab.Screen name="Home" component={HomeScreenTab} />
        <Tab.Screen name="Requests" component={Requests} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
        ): (
          <>
          <Tab.Screen name="Home" component={HomeScreenTab}/>
          <Tab.Screen name='Order' component={OrderScreen}/>
          <Tab.Screen name='Points' component={PointsScreen} />
          <Tab.Screen name='Reward' component={RewardScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />

          </>
        )
      }
      
    </Tab.Navigator>
  );
}

const NavigationLinks = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login"
      
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        ...customSlideFromLeft,
      }}>
         <Stack.Screen name="Profile" component={Profile} options={{ title: '' }} />
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
        <Stack.Screen name='ConfirmDetail' component={ConfirmDetailsScreen} options={{title: ''}}/>
        <Stack.Screen name='DistributorExpand' component={DistributorExpandScreen} options={{title:''}}/>
        <Stack.Screen name='ConfirmPurchase' component={ConfirmPurchase} options={{title:''}}/>
        <Stack.Screen name='Success' component={SuccessScreen} options={{headerShown:false}} />
          <Stack.Screen name='Confirm' component={ConfirmPage} options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
       <Stack.Screen
            name="AddressList"
            component={AddressList}
            options={({ route }) => ({
              title: route.params?.fromProfile ? 'Addresses' : '',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '700',
              },
            })}
/>
<Stack.Screen name='HistoryScreen' component={History} options={{
          title: 'History',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
        <Stack.Screen name='FavouritesScreen' component={FavouritesScreen} options={{
          title: 'Favourites',
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
        <Stack.Screen name='IdVerification' component={IdVerificationScreen} options={{
          title: '',
        }}></Stack.Screen>
        <Stack.Screen name='IdConfirmation' component={IdConfirmationScreen} options={{title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLinks;