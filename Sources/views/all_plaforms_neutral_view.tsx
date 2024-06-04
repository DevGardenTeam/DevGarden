import React, { Suspense, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonMultiSelectPlatformComponent from '../components/button_multiselect_platform_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';
import Trigger from '../components/3d_components/trigger';
import Loader from '../components/3d_components/loader';
import useControls from "r3f-native-orbitcontrols"
import { Canvas } from '@react-three/fiber/native'
import { TerrainModel } from '../components/3d_components/terrain_component'
import {moderateScale, horizontalScale, verticalScale } from '../service/Metrics';


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
          <View style={styles.top}>
                <View style={styles.navigationBack}>
                  <BackNavigationButton onPress={() => navigation.navigate("Login")}/>                 
                </View>
                <View style={styles.titleContainer}>
                  <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
                </View>
          </View>
          <View style={styles.mainView}>
              <View style={styles.contentView}>
                {/* <TouchableOpacity style={styles.mainContent} onPress={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}>
                  <View > */}
                    <View style={{ flex: 1,  }} {...events} >
                                  {loading && <Loader />}
                      <Canvas frameloop="demand" camera={ {position: [5, 3, 5]}}>

                        <OrbitControls enablePan={false}/>

                        <directionalLight position={[1, 0, 0]} args={['white', 2]} />
                        <directionalLight position={[-1, 0, 0]} args={['white', 2]}  />
                        <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
                        <directionalLight position={[0, 1, 0]} args={['white', 2]}  />
                        <directionalLight position={[0, -1, 0]} args={['white', 2]}  />


                        <Suspense fallback={<Trigger setLoading={setLoading} />}>
                          <TerrainModel 
                            onClickTree={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}
                            onClickChest={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}
                            onClickSign={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}
                            onClickBush={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}
                            onClickRock={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}
                          />
                        </Suspense>
                      </Canvas>
                      
                    </View>              
    
                <View style={styles.slidingButton}>
                  <ButtonMultiSelectPlatformComponent onSelect={(platform) => setSelectedPlatform(platform)}></ButtonMultiSelectPlatformComponent>
                </View>                  
              </View>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
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
      flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
      alignItems: 'center', // Pour centrer horizontalement le texte
  },
  titleText: {
      fontSize: moderateScale(50),
      fontWeight: 'bold',
      textAlign: 'center'
  },
  
  mainView: {
    flex: 1,
    display: 'flex',
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
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '50%',
    marginBottom: '10%',
  },
  slidingButton:{
      backgroundColor: '#E7E7E7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      height: '20%',
  }
})

export default AllPlatformsNeutralView;