/* MAIN VIEW USED IN POC TO TEST OAUTH2 AUTHENTICATION --   

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

export default function App() {

  async function handleSignIn() {  
    const CLIENT_ID = 'e2ab8ffbefc5b983f71b'
    const SCOPE = 'http://localhost:19006/'
    const RESPONSE_TYPE = 'token';

    const authUrl = 'https://github.com/login/oauth/authorize?client_id=e2ab8ffbefc5b983f71b&redirect_uri=&scope=http://localhost:19006/'
    const response = await AuthSession.startAsync({ authUrl });
    console.log(response);
    
  }


  return (
    <View style={styles.container}>
      <Button title='Enter with Github' onPress={() => handleSignIn()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/