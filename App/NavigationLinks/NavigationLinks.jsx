
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import LoginScreen from '../Screens/login/Login';
import HomeScreen from '../Screens/Home/Home';
import OrderScreen from '../Screens/Orders/OrderScreen';
import Requests from '../Screens/Requests/Requests';
import DistributorHistory from '../Screens/History/DistributorHistory';
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

import { useCallback, useEffect, useState } from 'react';
import FavouritesScreen from '../Screens/Profile/FavouritesScreen';
import IdVerificationScreen from '../Screens/rewards/IdVerificationScreen';
import IdConfirmationScreen from '../Screens/rewards/IdConfirmationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryScreen from '../Screens/History/HistoryScreen';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from '../context/LanguageContext';
import TermsScreen from '../Screens/login/TermsConditions';

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
  const [role, setRole] = useState('')
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [initialRoute, setInitialRouteName] = useState('Home')
  useFocusEffect(
    useCallback(() => {
      const getValueFromStorage = async () => {
        try {
          const user = await AsyncStorage.getItem('role');
          console.log('user===============', user,initialRoute);
          setRole(user);
          setInitialRouteName('Home')
        } catch (error) {
          //console.error('Error fetching data from AsyncStorage:', error);
        }
      };
  
      getValueFromStorage();
  
      // Cleanup function if needed
      return () => {
        // Cleanup code here (if any)
      };
    }, [])
  );

  return (
    
    <Tab.Navigator
      initialRouteName={initialRoute}
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
        else if (route.name === 'DistributorHistory') {
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
        isFocused && role === 'Distributor' ? (
        <>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: t('home'),
          initialRouteName:{initialRoute}
        }}
        initialParams={{ initialRoute: true }}  />
        <Tab.Screen name="Requests" component={Requests} options={{
          tabBarLabel: t('requests'),
        }}/>
        <Tab.Screen name="DistributorHistory" component={DistributorHistory} options={{
          tabBarLabel: t('history'),
        }}/>
        <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarLabel: t('profile'),
        }}/>
        </>
        ): (
          <>
          <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: t('home'),
          initialRouteName:{initialRoute}
        }}
        initialParams={{ initialRoute: true }} />
          <Tab.Screen name='Order' component={OrderScreen} options={{
          tabBarLabel: t('orders'),
        }}/>
          <Tab.Screen name='Points' component={PointsScreen} options={{
          tabBarLabel: t('points'),
        }}/>
          <Tab.Screen name='Reward' component={RewardScreen} options={{
          tabBarLabel: t('rewards'),
        }}/>
          <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: t('profile'),
        }}/>

          </>
        )
      }
    </Tab.Navigator>
  );
}

const NavigationLinks = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <LanguageProvider>
      <Stack.Navigator  
       initialRouteName="SplashScreen"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        ...customSlideFromLeft,
      }}>
        
         <Stack.Screen name='SplashScreen' component={SplashScreen}
         options={{
          headerShown: false,
      }}/>
        <Stack.Screen name="Login" component={LoginScreen} 
            options={{
            headerShown: false,
        }}/>
         <Stack.Screen name='Terms' component={TermsScreen} options={{
          title: t('Terms&Conditions'),
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
        <Stack.Screen  name='ForgetPassword' component={ForgetPasswordScreen} options={{title: ''}}/>
       
       <Stack.Screen name="Homescreen" component={MyTabs} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Notification" component={Notification} options={{
          title: t('notifications'),
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }} />
          <Stack.Screen name='Language' component={LanguageScreen} 
          options={{
          title: t('languages'),
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
          <Stack.Screen name='Contact' component={ContactScreen} options={{
          title: t('contact us'),
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
          
        }}/>
          <Stack.Screen name='About' component={AboutScreen} options={{
          title: t('about us'),
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            fontWeight:'700'
          }
        }}/>
          <Stack.Screen name='Privacy' component={PrivacyScreen} options={{
          title: t('privacy policy'),
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
<Stack.Screen name='HistoryScreen' component={HistoryScreen} options={{
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
      </LanguageProvider>
    </NavigationContainer>
  )
};

export default NavigationLinks;