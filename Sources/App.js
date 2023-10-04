import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import i18n from "./i18n";
import { I18nextProvider, useTranslation } from "react-i18next";

export default function App() {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t('welcome')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t('supportedLanguages.en')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
