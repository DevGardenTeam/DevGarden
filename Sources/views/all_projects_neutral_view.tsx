import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator, Dimensions, ScrollView, StatusBar } from 'react-native';
import { RepositoryController } from '../view-controllers/RepositoryViewController';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonProjectComponent from '../components/button_project_component'
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
import {moderateScale, horizontalScale, verticalScale } from '../service/Metrics';

interface AllProjectsNeutralViewProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  platform: string,
}

const AllProjectsNeutralView: React.FC<AllProjectsNeutralViewProps> = ({ navigation }) => {
  const route = useRoute();
  const { platform } = route.params as RouteParams;
  const { colors } = useTheme();
  const { repositories, loading, error, handleRepositoryPress, fetchRepositories } = RepositoryController({ platform });

  useEffect(() => {
    fetchRepositories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
        <View style={styles.top}>   
          <View style={styles.navigationBack}>
            <BackNavigationButton onPress={() => navigation.navigate("AllPlatforms")}/>                 
          </View> 
          <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colors.text }]}>Choisissez un projet</Text>
          </View>
        </View>

        <View style={styles.mainView}>
          <View style={styles.mainContent}>
            <FlatList
              style={styles.flatList}
              data={repositories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ButtonProjectComponent title={item.name} memborsCount={item.name} onPress={() => navigation.navigate("Project", {platform: platform, owner: item.owner.name, repository: item.name})}></ButtonProjectComponent>             
              )}
            />
          </View>  
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // LIST VIEW
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    display: 'flex',
    height: 'auto'
  },
  // Header => back button + Title
  top:{
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginBottom : verticalScale(25),
  },
  navigationBack: {
      position: "absolute",
      top: verticalScale(15),
      left: horizontalScale(15),
      zIndex:1
  },
  titleContainer: {
      flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
      alignItems: 'center', // Pour centrer horizontalement le texte
      paddingHorizontal: horizontalScale(30)
  },
  titleText: {
      fontSize: moderateScale(35),
      fontWeight: 'bold',
      textAlign: 'center'
  },

  mainContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: 'auto',
    marginLeft: '10%',
    marginRight: '10%',
  },
  flatList:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
  }
})

export default AllProjectsNeutralView;