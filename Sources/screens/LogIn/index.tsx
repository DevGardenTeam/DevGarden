import * as React from 'react';
import { View, StatusBar,  } from 'react-native';
import GithubAuth from '../../auth/github';
import GiteaAuth from '../../auth/gitea';
import GitlabAuth from '../../auth/gitlab';


export default function Login() {
 return(
  <View>
      <StatusBar />
      <GithubAuth />
      <GiteaAuth />
      <GitlabAuth />
  </View>
 );
}
