import {Alert , Platform } from 'react-native';

const CreateErrorAlert = (title: string, error: string) =>
    {
        if (Platform.OS === 'web'){
            window.confirm([title, error].filter(Boolean).join('\n'))
        }
        else{
            Alert.alert(title, error, [
                {text: 'OK'},
              ]);
        }
    }
    
export { CreateErrorAlert }
    