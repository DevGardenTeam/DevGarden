import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native"; 
import HomeScreen from '../views/HomeScreen';
import LoginScreen from '../views/LoginScreen';
import AllProjectsNeutralView from '../views/all_projects_neutral_view';
import AllPlatformsNeutralView from '../views/all_plaforms_neutral_view';

export default function Navigation() {
    const BottomTabNavigator = createBottomTabNavigator();
    return (
        <NavigationContainer >
            <BottomTabNavigator.Navigator initialRouteName="Home" >
                <BottomTabNavigator.Screen name="Home" component={HomeScreen}
                                           options={{
                                                title: 'Home',
                                           }}/>
                                           <BottomTabNavigator.Screen name="Login"  component={LoginScreen}
                                           options={{
                                                title: 'Login',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="AllProjects"  component={AllProjectsNeutralView}
                                           options={{
                                                title: 'AllProjects',
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="AllPlatforms"  component={AllPlatformsNeutralView}
                                           options={{
                                                title: 'AllPlatforms',
                                                headerShown: false
                                           }}/>
            </BottomTabNavigator.Navigator>
        </NavigationContainer>
    )
}