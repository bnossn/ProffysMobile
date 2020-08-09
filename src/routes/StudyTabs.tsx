import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import { Ionicons } from '@expo/vector-icons' //Expo ja disponibiliza principais pacotes de icones


const { Navigator, Screen } = createBottomTabNavigator();

/* Nao importamos NavigationContainer aqui.
Ele so precisa aparecer uma vez em volta do app todo e o importamos no AppStack.tsx */
function StudyTabs() {
    return (

        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                },
                tabStyle: {
                    flexDirection: 'row', //Icone e text lado a lado. Padrão é em coluna.
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20,
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d',
            }}
        >

            <Screen 
                name='TeacherList' 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name='ios-easel' size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />

            <Screen 
                name='Favorites' 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name='ios-heart' size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />

        </Navigator>

    )
}

export default StudyTabs;