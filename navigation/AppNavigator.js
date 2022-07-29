import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
    HomeScreen, 
    ClassesScreen, 
    ActivitiesScreen, 
    AccountScreen
} from '../screens';

import AccountNavigator from './AccountNavigator';
import Header from './Header';
import Footer from './Footer';

const tabScreenData = {
    home: {
        name: "Home",
        component: HomeScreen,
        iconName: "home"
    },
    classes: {
        name: "Classes",
        component: ClassesScreen,
        iconName: "tasks"
    },
    activities: {
        name: "Activities",
        component: ActivitiesScreen,
        iconName: "heartbeat"
    },
    account: {
        name: "Account",
        component: AccountNavigator,
        iconName: "user"
    },
}


const Tab = createBottomTabNavigator();
const AppNavigator = () => {

    return (
        <Tab.Navigator 
            tabBar = { props => <Footer {...props} /> } 
            initialRouteName='Home'
        >
            {
                tabScreenData && Object.values(tabScreenData).map(tab => {

                    return (
                        <Tab.Screen
                            key={tab.name}
                            name={tab.name}
                            component={tab.component}
                            initialParams={{ iconName: tab.iconName }}
                            options={{
                                header: Header,
                            }}
                        />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default AppNavigator;