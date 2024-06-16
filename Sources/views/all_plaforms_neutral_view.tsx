import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, ActivityIndicator, Platform, SafeAreaView} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonMultiSelectPlatformComponent from '../components/button_multiselect_platform_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
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

  const fetchCalled = useRef(false);

  useEffect(() => {
    if (!fetchCalled.current) {
      console.warn("fetching repositories for the first time")
      fetchRepositories();
      fetchCalled.current = true;
    } else {
      console.warn("Use effect called with no action")
    }
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
      <View style={[styles.mainView]}>
          <View style={styles.gardenViewContainer} {...events} >
            <GardenView selectedPortion={selectedPlatform} repositories={repositories}/>
          </View>
          <View style={styles.topMargin}>
            {Platform.OS === 'web' && (
              <View style={styles.titleContainer}>
                <View style={styles.titleSubContainer}>
                  <Text style={[styles.titleText, { color: colors.text }]}>Gitlab</Text>
                </View>
                <View style={styles.titleSubContainer}>
                  <Text style={[styles.titleText, { color: colors.text }]}>Github</Text>
                </View>
                <View style={styles.titleSubContainer}>
                  <Text style={[styles.titleText, { color: colors.text }]}>Gitea</Text>
                </View>
              </View>
            )}
            {Platform.OS !== 'web' && (
              <View style={styles.titleContainerMobile}>
                <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
              </View>
            )}        

            <View style={styles.navigationBack} >
              <BackNavigationButton/> 
            </View>
          </View>          

          {Platform.OS !== 'web' && (
            <View style={styles.slidingButton}>
              <ButtonMultiSelectPlatformComponent onSelect={(platform) => setSelectedPlatform(platform)}></ButtonMultiSelectPlatformComponent>
            </View>
          )}     
      </View>
  );
}

const styles = StyleSheet.create({

  topMargin: {
    marginTop: StatusBar.currentHeight || 0
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
    marginBottom: verticalScale(15)
  },
  navigationBack: {
    position: "absolute",
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex: 1,
  },
  titleContainerMobile: {
    alignItems: 'center',
  },  
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleSubContainer: {
    flex: 1,
    alignItems: 'center',
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