import { StyleSheet, Text, View, Switch, Dimensions, StatusBar, Platform, BackHandler } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import '../service/i18n';
import React, { useState, Suspense, useEffect } from 'react';
import NavigationButton from '../components/button_component'
import BackNavigationButton from '../components/button_back_navigation_component';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import Trigger from '../components/3d_components/trigger';
import Loader from '../components/3d_components/loader';
import useControls from "r3f-native-orbitcontrols"
import { Canvas } from '@react-three/fiber/native'
import { TerrainModel1 } from '../components/3d_components/terrain_component'
import { TerrainModel2 } from '../components/3d_components/terrain2_component'
import { TerrainModel3 } from '../components/3d_components/terrain3_component'
import { Repository } from '../model/Repository';
import MetricsUtils from '../helper/MetricsUtils';
import fontSizes from '../constants/fontSize';
import LoadingComponent from '../components/loading_component';



interface ProjectScreenProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  repository: Repository;
}

const ProjectScreen: React.FC<ProjectScreenProps> = ({ navigation }) => {  
  const route = useRoute();
  const { repository } = route.params as RouteParams;
  console.log("Got the repository: ", repository)
  console.log("**********************************")
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [OrbitControls ,events] = useControls()

  // Switch
  const [view, setView] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setView(!view); // Ajoutez cette ligne pour mettre à jour la variable view
  };

  const {t} = useTranslation();  // A ajouter pour le multi langue

  // Status d'un repository à utiliser avec les Metrics 
  const [status, setStatus] = useState('loading');

  useFocusEffect(
    React.useCallback(() => {
      const fetchStatus = async () => {
        try {
          const calculatedStatus = await MetricsUtils.calculateAverageMetric(repository.name);
          setStatus(calculatedStatus);
        } catch (error) {
          console.error('Failed to calculate average metric', error);
          setStatus('error');
        }
      };
      fetchStatus();
    }, [repository.name])
  );

  const truncateText = (text : string) => {
    if(Platform.OS !== 'web'){
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    }
    else{
      if (text.length > 25) {
        return text.substring(0, 25) + '...';
      }
      return text;
    }
    
  };

  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
            return false; // Disable back button
        };

        if(Platform.OS !== 'web') {
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    }, [])
  );


  if (!view) {
    const type = t('projectView.list');
    return (
      <View>
        <View style={styles.topList}>
          <View style={styles.navigationBack}>
            <BackNavigationButton />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, { color: colors.text }]}>
              {truncateText(repository.name)}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#D3D3D3', true: '#B9FFB6' }}
              thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], height: ISLANDSCAPE ? HEIGHT * 0.035 : HEIGHT * 0.025}}
            />
            <Text style={[styles.text, styles.textDay]}>{type}</Text>
          </View>
        </View>

          <View style={styles.mainContent}>
            <NavigationButton title={t('projectView.dashboard')} onPress={() => navigation.navigate("Dashboard")} />
            <NavigationButton title='Commits' onPress={() => navigation.navigate("AllCommits", {repository: repository})}/>
            <NavigationButton title='Issues' onPress={() => navigation.navigate("AllIssues", {repository: repository})}/>
            <NavigationButton title='Files' onPress={() => navigation.navigate("AllFiles", {repository: repository})}/>
            <NavigationButton title={t('project_management_title')} onPress={() => navigation.navigate("ProjectManagement", {repository: repository})}/>
          </View>
      </View>
    );
  }

  const type = t('projectView.garden');

  const getGradientColors = (status: string) => {
    switch (status) {
      case 'ok':
        return ['#f1a55d', '#e8e8e8']; // Middle status
      case 'bad':
        return ['#7c6969','#e8e8e8']; // Example colors for 'bad' status
      default:
        return ['#2B75B4', '#5292C5','#93C3E1','#C4E5F4','#DFF6FC']; // Default colors
    }
  };

 

  return (
    <View style={{ backgroundColor: colors.background, height: '100%' }}>
      <LinearGradient colors={getGradientColors(status)} style={styles.days}>
        <View style={styles.topList}>
          <View style={styles.navigationBack}>
            <BackNavigationButton />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, { color: colors.text }]}>
              {truncateText(repository.name)}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#D3D3D3', true: '#B9FFB6' }}
              thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], height: ISLANDSCAPE ? HEIGHT * 0.035 : HEIGHT * 0.025}}
            />
            <Text style={[styles.text, styles.textDay]}>{type}</Text>
          </View>
        </View>
      <View style={{ flex: 1,  }} {...events} >
                    {loading && <LoadingComponent/>}
                   
        <Canvas frameloop="demand" camera={{ position: [5, 3, 5] }}>
          <OrbitControls enablePan={false} maxZoom={7} minZoom={3.5}
            maxPolarAngle={1.8} minPolarAngle={0.5} maxAzimuthAngle={3} minAzimuthAngle={-0.1} />
          <ambientLight intensity={1} />
          <directionalLight position={[1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[0, 1, 0]} args={['white', 2]}  />
          <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
          {(() => {
              switch (status) {
                case 'ok':
                  return <TerrainModel2 
                    onClickTree={() => navigation.navigate("AllCommits", {repository: repository})}
                    onClickChest={() => navigation.navigate("AllFiles", {repository: repository})}
                    onClickSign={() => navigation.navigate("Dashboard", {repository: repository})}
                    onClickBush={() => navigation.navigate("AllIssues", {repository: repository})}
                    onClickRock={() => navigation.navigate("ProjectManagement", {repository: repository})}
                  />;
                case 'bad':
                  return <TerrainModel3 
                    onClickTree={() => navigation.navigate("AllCommits", {repository: repository})}
                    onClickChest={() => navigation.navigate("AllFiles", {repository: repository})}
                    onClickSign={() => navigation.navigate("Dashboard", {repository: repository})}
                    onClickBush={() => navigation.navigate("AllIssues", {repository: repository})}
                    onClickRock={() => navigation.navigate("ProjectManagement", {repository: repository})}
                  />;
                default:
                  return <TerrainModel1
                    onClickTree={() => navigation.navigate("AllCommits", {repository: repository})}
                    onClickChest={() => navigation.navigate("AllFiles", {repository: repository})}
                    onClickSign={() => navigation.navigate("Dashboard", {repository: repository})}
                    onClickBush={() => navigation.navigate("AllIssues", {repository: repository})}
                    onClickRock={() => navigation.navigate("ProjectManagement", {repository: repository})}
                  />;
              }
            })()}
          </Suspense>
        </Canvas>
      </View>    
      </LinearGradient>
    </View>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  
  backButton:{
    margin: 40,
  },

  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  days: {
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection:'column',
  },
  top:{
    width: '100%',
    height: ISLANDSCAPE ? HEIGHT*0.20+HEIGHT*0.037 : WIDTH*0.25+WIDTH*0.07,
    justifyContent: "space-between",
    flexDirection:'row',
  },

  switchContainer: {
    flexShrink: 1, // Permet au conteneur de se réduire si nécessaire
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: horizontalScale(10),
  },
  text: {
    fontSize: fontSizes.small,
  },
  textDay: {
    color:'black',
    marginTop: ISLANDSCAPE ? HEIGHT*0.035 : WIDTH*0.03,
  },
  textNight: {
    color:'white'
  },
  luminary: {
    borderRadius: WIDTH,
    height: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    width: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    marginTop: ISLANDSCAPE ? HEIGHT*0.035 : WIDTH*0.06,
    marginLeft: ISLANDSCAPE ? "2%" : "5%",
  },
  bottom:{
    width: '100%',
    height: ISLANDSCAPE ? HEIGHT - (HEIGHT*0.20+HEIGHT*0.037+HEIGHT*0.2) : HEIGHT - (WIDTH*0.25+WIDTH*0.065+HEIGHT*0.2),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  sign: {
    height: ISLANDSCAPE ? HEIGHT*0.25 : WIDTH*0.30,
    width : ISLANDSCAPE ? HEIGHT*0.25 : WIDTH*0.30,
    resizeMode: 'contain',
    marginBottom: ISLANDSCAPE ? -HEIGHT*0.04 : '-30%',
  },
  tree: {
    height: ISLANDSCAPE ? HEIGHT*0.50 : WIDTH*0.75,
    width : ISLANDSCAPE ? HEIGHT*0.50 : WIDTH*0.5,
    resizeMode: 'contain',
    marginBottom: ISLANDSCAPE ? -HEIGHT*0.045 : '-25%' ,
  },

  // LIST VIEW
  // Header => back button + Title
  topList:{
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
  },
  navigationBack: {
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex:1
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center', // Pour centrer verticalement le texte
    alignItems: 'center',
    height: verticalScale(75),
    paddingHorizontal: horizontalScale(4),
  },
  titleText: {
      fontSize: fontSizes.xxlarge, // Taille de police responsive
      fontWeight: 'bold',
      textAlign: 'center'
  },
  
  mainContent:{
    alignItems: 'center',
    justifyContent:'space-evenly',
    height:'65%',
    marginTop: verticalScale(35),
  }

  
});

export default ProjectScreen;