import React, { Suspense, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonMultiSelectPlatformComponent from '../components/button_multiselect_platform_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
import Trigger from '../components/3d_components/trigger';
import Loader from '../components/3d_components/loader';
import useControls from "r3f-native-orbitcontrols"
import { Canvas } from '@react-three/fiber/native'
import { TerrainModel } from '../components/3d_components/terrain_component'
import GardenView from './GardenView';


interface AllPlatformsNeutralViewProps {
  navigation: StackNavigationProp<any>;
}

const AllPlatformsNeutralView: React.FC<AllPlatformsNeutralViewProps> = ({ navigation }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [OrbitControls ,events] = useControls()

  return (
      <SafeAreaView style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
          <View style={styles.mainView}>
              <View style={{ flex: 1,  }} {...events} >
                {loading && <Loader />}
                <GardenView selectedPortion={selectedPlatform}/>
              </View>              

              <View style={styles.backButton} >
                <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
              </View>

              <View style={styles.titleView}>
                <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
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
  backButton:{
    position: 'absolute',
    top: 20,
    left: 20,
  },
  mainView: {
    flex: 1,
  },
  titleView: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
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