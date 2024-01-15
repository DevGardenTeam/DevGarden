import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native"; 
import HomeScreen from '../views/HomeScreen';
import LoginScreen from '../views/LoginScreen';
import ParametersScreen from '../views/parameters_view';
import ProjectScreen from '../views/project_view';
import ProjectManagementScreen from '../views/project_management_view';

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
                                           <BottomTabNavigator.Screen name="Parameters"  component={ParametersScreen}
                                           options={{
                                                title: 'Parameters',
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="Project"  component={ProjectScreen}
                                           options={{
                                                title: 'Project',
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="Project_Management"  component={ProjectManagementScreen}
                                           options={{
                                                title: 'Project_Management',
                                                headerShown: false
                                           }}/>
            </BottomTabNavigator.Navigator>
        </NavigationContainer>
    )
}