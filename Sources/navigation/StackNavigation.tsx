import React from 'react';
import { createStackNavigator, Header } from "@react-navigation/stack";
import AllPlatformsNeutralView from "../views/all_plaforms_neutral_view";
import AllCommitsView from "../views/all_commits_view";
import AllProjectsNeutralView from "../views/all_projects_neutral_view";
import LoginScreen from "../views/LoginScreen";
import GardenView from "../views/GardenView";

export default function StackNavigation() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Garden" screenOptions={{headerShown : false}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="AllPlatformsNeutral" component={AllPlatformsNeutralView}/>
          <Stack.Screen name="AllProjects" component={AllProjectsNeutralView}/>
          <Stack.Screen name="AllCommits" component={AllCommitsView}/>
          <Stack.Screen name="Garden" component={GardenView}/>
        </Stack.Navigator>
    )
  }