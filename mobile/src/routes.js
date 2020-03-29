import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Books from './pages/books';
import Detail from './pages/detail';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Books" component={Books} />
                <AppStack.Screen name="Detail" component={Detail} />                
            </AppStack.Navigator>
        </NavigationContainer>
    ); 
}
