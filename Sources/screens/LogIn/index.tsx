import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar,  } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { styles } from './styles';
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/e2ab8ffbefc5b983f71b',
};

export default function Login() {

  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'e2ab8ffbefc5b983f71b',
      scopes: ['identity'],
      redirectUri: 'http://localhost:19006/auth/callback',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(`response code => ${code}`); // Debug
  
      // Send the authorization code to your .NET Web API
      fetch('https://localhost:7260/api/OAuth/token', {
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
          const accessToken = data.access_token;
          console.log(`Access token => ${accessToken}`); // Debug
  
          if (accessToken) {
            // Proceed with your logic here, e.g., navigate to the success screen
            navigation.navigate('Success');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [response]);
  
  

  return (
    <View style={styles.container}>
      <Button title='Enter with Github' onPress={() => promptAsync()} />
      <StatusBar />
    </View>
  );
}
