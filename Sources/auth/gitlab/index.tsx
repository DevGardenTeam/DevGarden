import { GITLAB_CLIENT_ID } from "../config"

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar,  } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { generateState } from "../config";

// handle the redirection back to our app
WebBrowser.maybeCompleteAuthSession();


// just a formality for the different endpoints
const discovery = {
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
}

export default function GitlabAuth() {
	
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GITLAB_CLIENT_ID,
      scopes: ['read_api', 'read_user', 'read_repository'],
      redirectUri: 'http://localhost:19006/auth/callback',
    },
    discovery
  );

  // generate a state for the request
  const state = generateState();
  console.log(`state => ${state}`); // Debug

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log('response =>'); // Debug
      const { code } = response.params;
      console.log(response);
      console.log(GITLAB_CLIENT_ID);
      console.log(`response code => ${code}`); // Debug
      
      // Send the authorization code to the .NET Web API
      fetch('https://localhost:7260/api/v1/OAuth/token?platform=gitlab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          state: state,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
	  // get the token from the response data
          const accessToken = data.access_token;
          console.log(`Access token => ${accessToken}`); // Debug
  
          if (accessToken) {
            // navigate to the success screen
            navigation.navigate('Success', { accessToken: accessToken });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [response]);
  
  // button 
  return (
    <View style={styles.container}>
      <Button title='Enter with Gitlab' onPress={() => promptAsync()} />
      <StatusBar />
    </View>
  );
}

