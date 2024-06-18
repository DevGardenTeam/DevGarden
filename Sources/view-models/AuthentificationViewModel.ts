import Authen from '../auth/app/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { CreateErrorAlert } from '../components/alert';
import { storeTokenSecurely } from '../auth/tokenStorage';

const HandleRegister = async (email: string, password: string, verifPassword: string, navigation:  StackNavigationProp<any>) => {
  const result = await Authen.register(email, password,verifPassword);
  if(result.success){
    CreateErrorAlert("Félicitation","Vous venez de créer un compte sur DevGarden");
    navigation.navigate("Login");
  }
  else{
    CreateErrorAlert("Erreur",result.message);
  }

};

const Handlelogin = async (email: string, password: string, navigation: StackNavigationProp<any>, updateUser: (user: any) => void) => {
  const result = await Authen.login(email, password);
  const response = result.response ? await result.response.json() : null;

  if(result.success && response) {
    const user = {
      username: response.username,
      services: response.services,
    };
    updateUser(user);


    // PLAN B IF CACHE DOESN'T WORK
    // fetch the existing access tokens
    // const tokens = await Authen.getTokens(user.username);

    // console.log('Tokens:', tokens);

    // Store the tokens
    // if (tokens) {
    //   Object.keys(tokens).forEach(async (key: string) => {
    //     try {
    //       const tokenValue = JSON.stringify(tokens[key]); // Serialize the token value
    //       await storeTokenSecurely(key, tokenValue);
    //       console.log('Token stored successfully, for key:', key);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   });
    //}

    navigation.navigate("AllPlatforms");
  } 
  else{
    CreateErrorAlert("Erreur",result.message);
  }
};

export { HandleRegister , Handlelogin }