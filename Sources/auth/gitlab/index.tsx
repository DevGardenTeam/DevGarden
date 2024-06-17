import { GITLAB_CLIENT_ID } from "../config"

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar, TouchableOpacity, Text,  } from 'react-native';

import { StyleSheet } from 'react-native';
import { CURRENT_BASE_URL, GitAuthProps } from "../../constants/constants";
import { horizontalScale, moderateScale, verticalScale } from "../../service/Metrics";

// handle the redirection back to our app
WebBrowser.maybeCompleteAuthSession();


// just a formality for the different endpoints
const discovery = {
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
}

export default function GitlabAuth({ onLinkChange, username }: { onLinkChange: (isLinked: boolean) => void; username: string }) {
  
  const handleLinkChange = (isLinked: boolean) => {
    onLinkChange(isLinked);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GITLAB_CLIENT_ID,
      scopes: ['read_api'],
      redirectUri: 'http://localhost:19006/auth/callback',
      usePKCE: false,
    },
    discovery
  );

  // console.log(request);

  // generate a state for the request

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log('response =>'); // Debug
      const { code } = response.params;
      console.log(response);
      console.log(GITLAB_CLIENT_ID);
      console.log(`response code => ${code}`); // Debug
      
      // Send the authorization code to the .NET Web API
      fetch(`${CURRENT_BASE_URL}/OAuth/token/exchange?platform=gitlab&username=${username}`, {
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
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Enter with Gitlab</Text>
      </TouchableOpacity>
    </View>
  );
}


export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: horizontalScale(5),

  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    elevation: 1,
  },
  buttonText: {
    color: '#E07919',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
