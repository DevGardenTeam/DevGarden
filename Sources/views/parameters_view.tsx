import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import ParametersButton from '../components/parameters_buttons_component';
import React from 'react';

export default function App() {
    const {t} = useTranslation();     // A ajouter pour le multi langue
    return (
        <SafeAreaView style={styles.container}>
            <ParametersButton title={t('parameters.log_out')} iconSource={require('./icon.png')}/>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#191266',
    }});