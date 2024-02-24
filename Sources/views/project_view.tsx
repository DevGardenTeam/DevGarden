import { SafeAreaView, StyleSheet, Text, View, Switch, Dimensions, TouchableOpacity, Image, StyleProp, ImageStyle } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import '../service/i18n';
import React, { useState, useEffect } from 'react';
import NavigationButton from '../components/button_component'
import BackNavigationButton from '../components/button_back_navigation_component';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomStyle extends ImageStyle {
  backgroundImage?: string;
}

interface ProjectScreenProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  owner: string;
  repository: string;
}


const ProjectScreen: React.FC<ProjectScreenProps> = ({ navigation }) => {
  
  const route = useRoute();
  const { owner, repository } = route.params as RouteParams;

  // Changement de fond selon l'horaire
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 8 && currentHour < 18;
    setIsDaytime(isDay);
  }, []); 

  // Switch

  const [view, setView] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setView(!view); // Ajoutez cette ligne pour mettre à jour la variable view
  };

  const {t} = useTranslation();     // A ajouter pour le multi langue

  if (!view) {
    const type = t('projectView.list');
    return (
      <SafeAreaView style={styles.container2}>
        <View style={styles.backButton}>
          <BackNavigationButton onPress={() => navigation.navigate("AllProjects")}/> 
        </View>

        <View style={styles.listTop}>
          <Text style={styles.title}>DevGarden</Text>
          <View style={styles.switch}>
            <Switch trackColor={{false: '#D3D3D3', true: '#B9FFB6'}}
              thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], height: ISLANDSCAPE ? HEIGHT * 0.035 : HEIGHT * 0.025}}>
            </Switch>
            <Text style={[styles.text,styles.textDay]}>{type}</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <NavigationButton title={t('projectView.dashboard')} onPress={() => navigation.navigate("Project")} />
          <NavigationButton title='Commits' onPress={() => navigation.navigate("AllCommits", {owner: owner, repository: repository})}/>
          <NavigationButton title='Issues' onPress={() => navigation.navigate("AllIssues", {owner: owner, repository: repository})}/>
          <NavigationButton title={t('project_management_title')} onPress={() => navigation.navigate("Project")}/>
        </View>
      </SafeAreaView>
    );
  }

  const type = t('projectView.garden');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[ '#7E6200', 'transparent']}
        // start={{x:0, y: 0}}
        // end={{x: 0, y: 1}}
        style={styles.ground}
      /> 
      <LinearGradient colors={isDaytime ? [ '#2B75B4', '#5292C5','#93C3E1','#C4E5F4','#DFF6FC'] : [ '#2654AC', '#4674DC','#325EBF','#173B88','#091434']}
        locations={isDaytime ? [0,0.2,0.5,0.8,1] :[0,0.2,0.4,0.6,1]}
        // start={isDaytime ? {x:0, y: 0} : {x:0, y: 0}}
        // end={isDaytime ? {x:0, y: 1} : {x:0, y: 0}}
        style={[styles.days]}>
        <View style={styles.top}>
          <TouchableOpacity style={[styles.luminary,isDaytime ? styles.sun : styles.moon]} />
          <View style={styles.switch}>
            <Switch trackColor={{false: '#D3D3D3', true: '#B9FFB6'}}
              thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], height: ISLANDSCAPE ? HEIGHT * 0.035 : HEIGHT * 0.025}}>
            </Switch>
            <Text style={[styles.text,isDaytime ? styles.textDay : styles.textNight]}>{type}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity>
              <Image source={require('../assets/panneau.png')} style={styles.sign as StyleProp<ImageStyle>}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/trees/tree1.png')} style={styles.tree as StyleProp<ImageStyle>}></Image>
            </TouchableOpacity>
        </View>
      <View style={styles.backButton}>
        <BackNavigationButton onPress={() => navigation.goBack()}/> 
      </View>
      </LinearGradient>
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

  container: {
    flex: 1,
    backgroundColor: '#F1F0F0',
    flexDirection: 'column-reverse',
  },
  ground:{
    width: '100%',
    height:'20%',
  },
  days: {
    width: '100%',
    height:'80%',
    display: 'flex',
    flexDirection:'column',
  },
  top:{
    width: '100%',
    height: ISLANDSCAPE ? HEIGHT*0.20+HEIGHT*0.037 : WIDTH*0.25+WIDTH*0.07,
    justifyContent: "space-between",
    flexDirection:'row',
  },
  switch: {
    margin: ISLANDSCAPE ? "2%" : "5%",
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  text: {
    fontSize: ISLANDSCAPE ? HEIGHT*0.035 : WIDTH*0.04,
  },
  textDay: {
    color:'black'
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
  sun:{
    backgroundColor: 'orange',
    elevation: 100,
    shadowColor: 'rgba(255, 127, 0, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 1,
    // boxShadow: '0 0 5px rgba(255,127,0,1), 0 0 30px rgba(255,127,0,1), 0 0 100px rgba(255,255,0,1), inset 0 0 40px rgba(255,255,0,1)',
  },
  moon:{
    backgroundColor: '#fae4a8',
    backgroundImage: 'radial-gradient(circle at 40% 80%, #ddc997 10%, transparent 0), radial-gradient(circle at 55% 70%, #ddc997 5%, transparent 0), radial-gradient(circle at 58% 85%, #ddc997 6%, transparent 0), radial-gradient(circle at 80% 40%, #ddc997 12%, transparent 0), radial-gradient(circle at 87% 58%, #ddc997 4%, transparent 0)',
  }as CustomStyle,
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
  container2: {
    backgroundColor: '#F1F0F0',
  },
  listTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: ISLANDSCAPE ? HEIGHT*0.045 : '5%',
  },
  title: {
    fontSize: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.12,
    margin: ISLANDSCAPE ? HEIGHT*0.045 : WIDTH*0.080,
  },
  mainContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-evenly',
    height:'80%',
  }
});

export default ProjectScreen;