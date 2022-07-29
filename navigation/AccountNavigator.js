import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen, DetailsScreen } from '../screens/account';
const Stack = createStackNavigator();

const AccountNavigator= () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
            }}
        >
            <Stack.Screen 
                name="AccountHome" 
                component={AccountScreen}
            />

            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )

}

export default AccountNavigator;