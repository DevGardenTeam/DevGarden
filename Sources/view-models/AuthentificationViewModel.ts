import Authen from '../auth/app/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { CreateErrorAlert } from '../components/alert';

const HandleRegister = async (email: string, password: string, navigation:  StackNavigationProp<any>) => {
  const result = await Authen.register(email, password);
  if(result.success){
    CreateErrorAlert("Félicitation","Vous venez de créer un compte sur DevGarden");
    navigation.navigate("Login");
  }
  else{
    CreateErrorAlert("Erreur",result.message);
  }

};

const Handlelogin = async (email: string, password: string, navigation:  StackNavigationProp<any>) => {
  const result = await Authen.login(email, password);
  if(result.success){
    navigation.navigate("AllPlatforms");
  }
  else{
    CreateErrorAlert("Erreur",result.message);
  }
};

export { HandleRegister , Handlelogin }