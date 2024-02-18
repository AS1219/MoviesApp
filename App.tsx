import React, { useEffect, useRef } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './components/shared/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Login from './components/Login';
import { PaperProvider } from 'react-native-paper';
import { useAppSelector } from './components/shared/hooks';

import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';



const Stack = createNativeStackNavigator();


const App = React.memo((props) => {

  const userDetails = useAppSelector((state: RootState) => state.main.userDetails);

  console.log("details", userDetails)
  const toastRef = useRef<any>(null);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     if (state.isConnected) {
  //       toastRef.current?.show({
  //         type: 'success',
  //         text1: 'Back online',
  //         position: 'bottom',
  //         visibilityTime: 2000,
  //       });
  //     } else {
  //       toastRef.current?.show({
  //         type: 'error',
  //         text1: 'No network',
  //         position: 'bottom',
  //         visibilityTime: 2000,
  //       });
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {userDetails ? (
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      {/* <Toast /> */}
    </PaperProvider>
  )
})

export default App;