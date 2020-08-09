import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs'

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        
        <NavigationContainer>

            {/* This is my Stack Navigator */}
            <Navigator screenOptions={{ headerShown:false }} >
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />

                {/* Here is a menu inside our 'main' menu. */}
                <Screen name="Study" component={StudyTabs} /> 
            </Navigator>

        </NavigationContainer>
        
    )
}

export default AppStack;