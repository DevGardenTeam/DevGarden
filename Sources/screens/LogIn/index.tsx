import * as React from 'react';
import { View, StatusBar,  } from 'react-native';
import GithubAuth from '../../auth/github';


export default function Login() {
 return(
  <View>
      <StatusBar />
      <GithubAuth />
  </View>
 );
}
