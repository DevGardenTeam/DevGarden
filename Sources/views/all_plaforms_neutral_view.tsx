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
          <View style={styles.backButton}>
            <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
          </View>
          <View style={styles.mainView}>
              <View style={styles.titleView}>
                  <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
              </View>
              <View style={styles.contentView}>
                    <View style={{ flex: 1,  }} {...events} >
                                  {loading && <Loader />}
                      <Canvas frameloop="demand" camera={ {position: [5, 3, 5]}} onTouchEnd={() => navigation.navigate("AllProjects")}>

                        <OrbitControls enablePan={false}/>

                        <directionalLight position={[1, 0, 0]} args={['white', 2]} />
                        <directionalLight position={[-1, 0, 0]} args={['white', 2]}  />
                        <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
                        <directionalLight position={[0, 1, 0]} args={['white', 2]}  />
                        <directionalLight position={[0, -1, 0]} args={['white', 2]}  />


                        <Suspense fallback={<Trigger setLoading={setLoading} />}>
                          <TerrainModel/>
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
  backButton:{
    margin: 20,
  },
  mainView: {
    flex: 1,
    display: 'flex',
  },
  titleView: {
    display: 'flex',
    margin: 20,
  },
  titleText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 100,
    fontWeight: 'bold',
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