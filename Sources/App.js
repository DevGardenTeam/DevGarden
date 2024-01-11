import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue

export default function App() {
  const {t} = useTranslation();     // A ajouter pour le multi langue
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t('welcome')}</Text>  
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t('supportedLanguages.en')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// t('[key]') => valeur directe dans le json
// t('[key].[2nd_key]') => valeur indirecte dans le json

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191266',
  },
  button: {
    backgroundColor: '#6258e8',
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    color: 'white',
  },
});