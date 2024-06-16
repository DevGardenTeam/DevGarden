import Authen from '../auth/app/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { CreateErrorAlert } from '../components/alert';
import { useUser } from '../user/UserContext';

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
    navigation.navigate("AllPlatforms");
  } 
  else{
    CreateErrorAlert("Erreur",result.message);
  }
};

export { HandleRegister , Handlelogin }