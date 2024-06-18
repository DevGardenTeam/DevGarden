import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native"; 
import HomeScreen from '../views/HomeScreen';
import LoginScreen from '../views/LoginScreen';
import RegisterView from '../views/register_view';
import AllProjectsNeutralView from '../views/all_projects_neutral_view';
import AllPlatformsNeutralView from '../views/all_plaforms_neutral_view';
import AllCommitsView from '../views/all_commits_view';
import AllIssuesView from '../views/all_issues_view';
import ProjectScreen from '../views/project_view';
import ParametersScreen from '../views/parameters_view';
import ProjectManagementScreen from '../views/project_management_view';
import PertView from '../views/pert_main_view';
import WbsView from '../views/wbs_main_view';
import {DarkTheme, LightTheme} from "../theme/theme";
import {useColorScheme} from "react-native";
import AllFilesView from '../views/all_files_view';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../views/dashboard_view';

export default function Navigation() {

     useEffect(() => {
          if (typeof document !== 'undefined') {
               document.title = "Garden";
               console.log(document.title)
          }
     }, ["DevGarden"]);

     const scheme = useColorScheme();
     const Stack = createStackNavigator();
     return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <Stack.Navigator initialRouteName="Login" >
                <Stack.Screen name="Home" component={HomeScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Parameters"  component={ParametersScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Login"  component={LoginScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="AllProjects"  component={AllProjectsNeutralView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="AllPlatforms"  component={AllPlatformsNeutralView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="AllCommits"  component={AllCommitsView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="AllIssues"  component={AllIssuesView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Register"  component={RegisterView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Project"  component={ProjectScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="ProjectManagement"  component={ProjectManagementScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Wbs"  component={WbsView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Gantt"  component={ProjectManagementScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Pert"  component={PertView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="Dashboard"  component={DashboardScreen}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
                                           <Stack.Screen name="AllFiles"  component={AllFilesView}
                                           options={{
                                                title: 'DevGarden',
                                                headerShown: false
                                           }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}