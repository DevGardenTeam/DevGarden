import { SafeAreaView, StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import '../service/i18n';
import NavigationButton from '../components/button_component'
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';

interface ProjectManagementScreenProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  platform: string;
  owner: string;
  repository: string;
}

const ProjectManagementScreen: React.FC<ProjectManagementScreenProps> = ({ navigation }) =>  {
  const route = useRoute();
  const { platform, owner, repository } = route.params as RouteParams;
  const { colors } = useTheme();

  const {t} = useTranslation();     // A ajouter pour le multi langue
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.top}>
            <View style={styles.navigationBack}>
                <BackNavigationButton onPress={() => navigation.navigate("Project", {platform: platform, owner: owner, repository: repository})}/>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colors.text }]}>{t('project_management_title')}</Text>
            </View>
        </View>
        <View style={styles.mainContent}>
          <NavigationButton title='WBS' onPress={() => navigation.navigate("Wbs", {platform: platform, owner: owner, repository: repository})}/>
          <NavigationButton title='GANTT'/>
          <NavigationButton title='PERT' onPress={() => navigation.navigate("Pert", {platform: platform, owner: owner, repository: repository})}/>
        </View>
    </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
    backButton:{
      margin: 20,
    },
    container:{
    },
    // Top
    top:{
      flexDirection: 'row',
      alignItems : 'center',
      justifyContent: 'space-between',
      marginTop: StatusBar.currentHeight || 0,
      marginBottom : ISLANDSCAPE ? WIDTH*0.05 : WIDTH*0.05,
    },
    navigationBack: {
        marginLeft : ISLANDSCAPE ? WIDTH*0.02 : WIDTH*0.05,
    },
    titleContainer: {
        flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
        alignItems: 'center', // Pour centrer horizontalement le texte
    },
    titleText: {
        fontSize: ISLANDSCAPE ? WIDTH*0.075 : WIDTH*0.12,
        fontWeight: 'bold',
        textAlign: 'center'
    },


    mainContent:{
      display: 'flex',
      justifyContent:'space-evenly',
      alignItems: 'center',
      height:'50%'
    }
});

export default ProjectManagementScreen;