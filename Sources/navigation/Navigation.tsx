import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native"; 
import HomeScreen from '../views/HomeScreen';
import LoginScreen from '../views/LoginScreen';
import RegisterView from '../views/register_view';
import AllProjectsNeutralView from '../views/all_projects_neutral_view';
import AllPlatformsNeutralView from '../views/all_plaforms_neutral_view';
import AllCommitsView from '../views/all_commits_view';
import AllIssuesView from '../views/all_issues_view';
import DetailsIssueView from '../views/details_issue_view';
import ProjectScreen from '../views/project_view';
import ParametersScreen from '../views/parameters_view';
import ProjectManagementScreen from '../views/project_management_view';

export default function Navigation() {
    const BottomTabNavigator = createBottomTabNavigator();
    return (
        <NavigationContainer >
            <BottomTabNavigator.Navigator initialRouteName="Login" >
                <BottomTabNavigator.Screen name="Home" component={HomeScreen}
                                           options={{
                                                title: 'Home',
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="Parameters"  component={ParametersScreen}
                                           options={{
                                                title: 'Parameters',
                                                headerShown: false
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
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="AllPlatforms"  component={AllPlatformsNeutralView}
                                           options={{
                                                title: 'AllPlatforms',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="AllCommits"  component={AllCommitsView}
                                           options={{
                                                title: 'AllCommits',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="AllIssues"  component={AllIssuesView}
                                           options={{
                                                title: 'AllIssues',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="Register"  component={RegisterView}
                                           options={{
                                                title: 'Register',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="DetailsIssue"  component={DetailsIssueView}
                                           options={{
                                                title: 'DetailsIssue',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="Project"  component={ProjectScreen}
                                           options={{
                                                title: 'Project',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
                                           <BottomTabNavigator.Screen name="ProjectManagement"  component={ProjectManagementScreen}
                                           options={{
                                                title: 'ProjectManagement',
                                                tabBarStyle : {display : "none"},
                                                headerShown: false
                                           }}/>
            </BottomTabNavigator.Navigator>
        </NavigationContainer>
    )
}