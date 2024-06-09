import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonMultiSelectPlatformComponent from '../components/button_multiselect_platform_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
import Loader from '../components/3d_components/loader';
import useControls from "r3f-native-orbitcontrols"
import GardenView from './GardenView';
import {moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import { RepositoryController } from '../view-controllers/RepositoryViewController';


interface AllPlatformsNeutralViewProps {
  navigation: StackNavigationProp<any>;
}

const AllPlatformsNeutralView: React.FC<AllPlatformsNeutralViewProps> = ({ navigation }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(""); // Provide a default value for selectedPlatform
  const { colors } = useTheme();
  const [events] = useControls()

  const { repositories, loading, error, handleRepositoryPress, fetchRepositories } = RepositoryController({ platform: selectedPlatform });

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
      <View style={styles.mainView}>
          <View style={styles.gardenViewContainer} {...events} >
            {loading && <Loader />}
            <GardenView selectedPortion={selectedPlatform} repositories={repositories}/>
          </View>   

          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
          </View>           

          <View style={styles.navigationBack} >
            <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
          </View>

          <View style={styles.slidingButton}>
            <ButtonMultiSelectPlatformComponent onSelect={(platform) => setSelectedPlatform(platform)}></ButtonMultiSelectPlatformComponent>
          </View>                  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  gardenViewContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // Header => back button + Title
  top:{
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: verticalScale(15)
  },
  navigationBack: {
    position: "absolute",
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex: 1,
  },
  titleContainer: {
      alignItems: 'center', // Pour centrer horizontalement le texte
  },
  titleText: {
      fontSize: moderateScale(50),
      fontWeight: 'bold',
      textAlign: 'center'
  },
  
  mainView: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
  },
  mainContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    height: '10%',
  },

  slidingButton:{
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    height: '10%',
  }
})

export default AllPlatformsNeutralView;