import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import i18n from '../service/i18n';
import NavigationButton from '../components/button_component'

export default function App() {
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
      marginLeft: ISLANDSCAPE ? "5%" : "10%",
      marginBottom: ISLANDSCAPE ? "7%" : HEIGHT*0.2,
    },
    mainContent:{
      display: 'flex',
      alignItems: 'center',
    }
});