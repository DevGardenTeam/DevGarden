import {Alert} from 'react-native';

const CreateErrorAlert = (title: string, error: string) =>
    Alert.alert(title, error, [
      {text: 'OK'},
    ]);

export { CreateErrorAlert }
    