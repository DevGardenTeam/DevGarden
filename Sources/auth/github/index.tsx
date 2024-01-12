import { CLIENT_ID } from "../config"

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar,  } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { styles } from './styles';

// handle the redirection back to our app
WebBrowser.maybeCompleteAuthSession();

// just a formality for the different endpoints
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
}

export default function GithubAuth() {
	
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['identity', 'repo'],
      redirectUri: 'http://localhost:19006/auth/callback',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(`response code => ${code}`); // Debug
  
      // Send the authorization code to the .NET Web API
      //
      // other way to add query parameters :
      // const platform = "..."
      // const url = new URL("https:...")
      //
      // url.searchParams.append('platform', platform);
      fetch('https://localhost:7260/api/v1/OAuth/token?platform=github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
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
      <Button title='Enter with Github' onPress={() => promptAsync()} />
      <StatusBar />
    </View>
  );
}
