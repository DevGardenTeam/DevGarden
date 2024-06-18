import { GITHUB_CLIENT_ID } from "../config"

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { View, Button, StatusBar, TouchableOpacity, Text,  } from 'react-native';

import { StyleSheet } from 'react-native';

import { CURRENT_BASE_URL, GitAuthProps } from "../../constants/constants";
import { useUser } from "../../user/UserContext";
import { horizontalScale, moderateScale, verticalScale } from "../../service/Metrics";

import { useTranslation } from "react-i18next"; 

// handle the redirection back to our app
WebBrowser.maybeCompleteAuthSession();

// just a formality for the different endpoints
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_CLIENT_ID}`,
}

export default function GithubAuth({ onLinkChange, username }: { onLinkChange: (isLinked: boolean) => void; username: string }) {
  
  const handleLinkChange = (isLinked: boolean) => {
    onLinkChange(isLinked);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ['identity', 'repo'],
      redirectUri: 'http://localhost:19006/auth/callback',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(response);
      console.log(`response code => ${code}`); // Debug
  
      fetch(`${CURRENT_BASE_URL}/OAuth/token/exchange?platform=github&username=${username}`, {
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
  
  const { t } = useTranslation();
  // button 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>{t("settings.enterGitHub")}</Text>
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
    paddingHorizontal: horizontalScale(13),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    elevation: 1,
  },
  buttonText: {
    color: '#2A2A2A',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

