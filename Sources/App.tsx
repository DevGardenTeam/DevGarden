import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';




async function handleSignIn() {
  const navigation = useNavigation();  
  const CLIENT_ID = 'e2ab8ffbefc5b983f71b'
  const SCOPE = 'http://localhost:19006/'
  const RESPONSE_TYPE = 'token';

  const authUrl = 'https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=&scope=${SCOPE}'
  const response = await AuthSession.startAsync({ authUrl });
  console.log(response);
  
  navigation.navigate('Sucess');
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title='Enter with Github' onPress={handleSignIn} />
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
