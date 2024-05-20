import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator, Dimensions, ScrollView, StatusBar } from 'react-native';
import { RepositoryController } from '../view-controllers/RepositoryViewController';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonProjectComponent from '../components/button_project_component'
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';

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
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  // LIST VIEW
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    display: 'flex',
    height: '80%'
  },
  // Header => back button + Title
  top:{
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginBottom : ISLANDSCAPE ? WIDTH*0.05 : HEIGHT*0.05,
  },
  navigationBack: {
      marginLeft : ISLANDSCAPE ? WIDTH*0.02 : HEIGHT*0.05,
  },
  titleContainer: {
      flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
      alignItems: 'center', // Pour centrer horizontalement le texte
  },
  titleText: {
      fontSize: ISLANDSCAPE ? WIDTH*0.05 : HEIGHT*0.075,
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
    height: '100%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  flatList:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
})

export default AllProjectsNeutralView;