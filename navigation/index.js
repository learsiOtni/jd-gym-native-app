import { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { AuthContext, provider } from '../utils/AuthProvider';
import { AuthReducer, initialState } from '../utils/AuthReducer';
import { LoadingScreen } from '../screens';


const Stack = createStackNavigator();
const RootNavigator = () => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const authContext = useMemo( provider.bind(this, [dispatch]), []);

    useEffect( () => { authContext.fetchToken() }, []);
    const { userToken, isLoading } = state;

    if (isLoading) return <LoadingScreen /> ;

    return (
        <NavigationContainer >
            <AuthContext.Provider value={{...authContext, ...state}} >
                <Stack.Navigator>
                    {userToken !== null ? (
                        <Stack.Screen
                            name="App"
                            component={AppNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                    ) : (
                        <Stack.Screen 
                            name="Auth" 
                            component={AuthNavigator}
                            options={{ 
                                headerShown: false
                            }} 
                        />
                    )}
                </Stack.Navigator>
            </AuthContext.Provider>
        </NavigationContainer>
    )
}

export default RootNavigator;