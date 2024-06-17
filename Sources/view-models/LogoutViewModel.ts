import { StackNavigationProp } from '@react-navigation/stack';
import { CreateErrorAlert } from '../components/alert';
import { CommonActions } from '@react-navigation/native';

const LogOutHandler = async (navigation:  StackNavigationProp<any>) => {
    CreateErrorAlert("Au revoir","Vous venez de vous déconnecter de DevGarden !!");
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
      );
  };

export { LogOutHandler };