import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
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
        <View style={styles.backButton}>
            <BackNavigationButton onPress={() => navigation.navigate("Project", {platform: platform, owner: owner, repository: repository})}/>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{t('project_management_title')}</Text>
        <View style={styles.mainContent}>
          <NavigationButton title='WBS' onPress={() => navigation.navigate("Wbs", {owner: owner, repository: repository})}/>
          <NavigationButton title='GANTT'/>
          <NavigationButton title='PERT' onPress={() => navigation.navigate("Pert", {owner: owner, repository: repository})}/>
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
    title:{
      fontSize: 100,
      margin: 20,
      fontWeight: 'bold',
    },
    mainContent:{
      display: 'flex',
      justifyContent:'space-evenly',
      alignItems: 'center',
      height:'80%'
    }
});

export default ProjectManagementScreen;