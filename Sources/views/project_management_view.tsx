import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import '../service/i18n';
import NavigationButton from '../components/button_component'
import React from 'react';

const ProjectManagementScreen: React.FC = () =>  {
  const {t} = useTranslation();     // A ajouter pour le multi langue
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t('project_management_title')}</Text>
        <View style={styles.mainContent}>
          <NavigationButton title='WBS'/>
          <NavigationButton title='GANTT'/>
          <NavigationButton title='PERT'/>
        </View>
    </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
      fontSize: ISLANDSCAPE ? WIDTH * 0.06 : WIDTH * 0.1,
      color:"#414141",
      marginTop: ISLANDSCAPE ? "5%" : "15%",
      marginLeft: ISLANDSCAPE ? "5%" : "5%",
      marginBottom: ISLANDSCAPE ? "7%" : '10%',
    },
    mainContent:{
      display: 'flex',
      justifyContent:'space-evenly',
      alignItems: 'center',
      height:'75%'
    }
});

export default ProjectManagementScreen;