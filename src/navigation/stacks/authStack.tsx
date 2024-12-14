import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
 import Splash from '../../screens/auth/splash/Splash';
import Signup from '../../screens/auth/signUp/SignUp';
import Login from '../../screens/auth/login/Login';
import Chat from '../../screens/home/Chat/chat';
import Users from '../../screens/home/users/Users';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
       <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Signup'}
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={'Users'}
          component={Users}

          options={{headerShown: true}}
        />

        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
   );
};

export default AppNavigator;
