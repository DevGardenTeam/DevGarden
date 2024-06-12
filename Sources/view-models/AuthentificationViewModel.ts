import Authen from '../auth/app/index';
import { StackNavigationProp } from '@react-navigation/stack';

const HandleRegister = async (email: string, password: string, navigation:  StackNavigationProp<any>) => {
  const success = await Authen.register(email, password);
  if(success){
    navigation.navigate("Login");
  }
};

const Handlelogin = async (email: string, password: string, navigation:  StackNavigationProp<any>) => {
  const success = await Authen.login(email, password);
  if(success){
    navigation.navigate("AllPlatforms");
  }
};

export { HandleRegister , Handlelogin }