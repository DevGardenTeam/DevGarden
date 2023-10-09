import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import ParametersButton from './components/parameters_buttons_component';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import './service/i18n';

export default function App() {
    const {t} = useTranslation();     // A ajouter pour le multi langue

    // DropDownPicker

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: t('supportedLanguages.en'), value: t('supportedLanguages.en')},
    {label: t('supportedLanguages.fr'), value: t('supportedLanguages.fr')},
    {label: t('supportedLanguages.pt'), value: t('supportedLanguages.pt')}
  ]);
    return (
        <SafeAreaView style={styles.container}>
            <div style={styles.container_bis}>
              <div style={styles.part}>
                <image></image>
                <text>{t('parameters.language')}</text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}/>
              </div>
            </div>
            <ParametersButton title={t('parameters.log_out')} iconSource={require('./assets/logout.svg')}/>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#191266',
    },
    container_bis: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 6,
    },
    part:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 10,
      display: 'flex',
      flexDirection: 'row'
    }
  });