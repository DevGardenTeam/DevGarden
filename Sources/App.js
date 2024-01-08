import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import { RepositoryService } from './service/RepositoryService';

export default function App() {
  const {t} = useTranslation();     // A ajouter pour le multi langue
  const repo = new RepositoryService()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button title='Enter with Github' onPress={() => repo.getMany()} />
        <StatusBar />
      </View>
    </SafeAreaView>
  );
}

// t('[key]') => valeur directe dans le json
// t('[key].[2nd_key]') => valeur indirecte dans le json

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
