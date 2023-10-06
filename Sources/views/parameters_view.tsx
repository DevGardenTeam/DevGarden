import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import ParametersButton from '../components/parameters_buttons_component';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


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
            <ParametersButton title={t('parameters.log_out')} iconSource={require('./icon.png')}/>
            <div>
              <div style={styles.part}>
                <image></image>
                <text>{t('parameters.log_out')}</text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}/>
              </div>
            </div>
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
    part:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 10,
      display: 'flex',
      flexDirection: 'row'
    }
  });