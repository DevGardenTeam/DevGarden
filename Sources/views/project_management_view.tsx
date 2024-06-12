import { SafeAreaView, StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import '../service/i18n';
import NavigationButton from '../components/button_component'
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
import { horizontalScale, moderateScale, verticalScale } from '../service/Metrics';
import { ScreenSpace } from '@react-three/drei/core';
import { Repository } from '../model/Repository';

interface ProjectManagementScreenProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  repository: Repository;
}

const ProjectManagementScreen: React.FC<ProjectManagementScreenProps> = ({ navigation }) =>  {
  const route = useRoute();
  const { repository } = route.params as RouteParams;
  // const platform = "test";
  // const owner = "tim";
  // const repository = "devgarden";
  const { colors } = useTheme();

  const {t} = useTranslation();     // A ajouter pour le multi langue
  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
        <View style={styles.top}>
            <View style={styles.navigationBack}>
                <BackNavigationButton />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colors.text }]}>{t('project_management_title')}</Text>
            </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.container}>
            <NavigationButton title='WBS' onPress={() => navigation.navigate("Wbs", {repository: repository})}/>
          </View>
          <View style={styles.container}>
            <NavigationButton title='GANTT'/>
          </View>
          <View style={styles.container}>
            <NavigationButton title='PERT' onPress={() => navigation.navigate("Pert", {repository: repository})}/>
          </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    // Top
    top:{
      flexDirection: 'row',
      alignItems : 'center',
      marginTop: StatusBar.currentHeight || 0,
      marginBottom : verticalScale(50),
    },
    navigationBack: {
        marginLeft : horizontalScale(20),
    },
    titleContainer: {
        flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
        alignItems: 'center', // Pour centrer horizontalement le texte
    },
    titleText: {
        fontSize: moderateScale(35),
        fontWeight: 'bold',
        textAlign: 'center'
    },

    mainContent:{
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      marginVertical: verticalScale(25),
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    }
});

export default ProjectManagementScreen;