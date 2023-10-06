import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import ParametersButton from './components/parameters_buttons_component';
import './service/i18n';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';


export default function App() {
  const {t} = useTranslation();     // A ajouter pour le multi langue
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
  {label: t('supportedLanguages.en'), value: t('supportedLanguages.en')},
  {label: t('supportedLanguages.fr'), value: t('supportedLanguages.fr')},
  {label: t('supportedLanguages.pt'), value: t('supportedLanguages.pt')}
  ]);
  return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t('welcome')}</Text>  
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t('supportedLanguages.en')}</Text>
      </TouchableOpacity>
      <ParametersButton title={t('parameters.log_out')} iconSource={require('./assets/icon.png')}/>
      <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  elevation={3}/>
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
