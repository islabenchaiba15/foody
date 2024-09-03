import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Welcome from './screens/Welcome';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth_firebase } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

function Navigation() {
  const [user, setUser] = useState(null);
  const auth = auth_firebase;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, [auth]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'SignIn'} screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Welcome" component={Welcome} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
