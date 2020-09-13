import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth/lib';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext, AuthProvider } from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);
  const [ initialzing, setInitializing ] = useState(true);

  // Handle user state change
  function onAuthStateChanged(user) {
    setUser(user);
    if (initialzing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      { user? <HomeStack /> : <AuthStack /> }
    </NavigationContainer>
  )
}