import { GITEA_CLIENT_ID } from "../config"

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { CURRENT_BASE_URL, GitAuthProps } from "../../constants/constants";

// handle the redirection back to our app
WebBrowser.maybeCompleteAuthSession();

// just a formality for the different endpoints
const discovery = {
  authorizationEndpoint: 'https://gitea.com/login/oauth/authorize',
  tokenEndpoint: 'https://gitea.com/login/oauth/access_token',
}

export default function GiteaAuth({ onLinkChange, username }: { onLinkChange: (isLinked: boolean) => void; username: string }) {
  
  const handleLinkChange = (isLinked: boolean) => {
    onLinkChange(isLinked);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GITEA_CLIENT_ID,
      scopes: ['identity', 'repo'],
      redirectUri: 'http://localhost:19006/auth/callback',
      usePKCE: false,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(`response code => ${code}`); // Debug
  
      fetch(`${CURRENT_BASE_URL}/OAuth/token/exchange?platform=gitea&username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
        }),
      })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); 
      })
      .then((text) => {
        console.log('Raw text:', text); 
        return JSON.parse(text); 
      })
      .then((data) => {
        console.log(data); 
        const isLinked = data.isLinked;
        handleLinkChange(isLinked);
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [response, username]);
  
  // button 
  return (
    <View style={styles.container}>
      <Button title='Enter with Gitea' onPress={() => promptAsync()} />
      <StatusBar />
    </View>
  );
}
