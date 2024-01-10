import { SafeAreaView, StyleSheet, Text, View, Switch, Dimensions, TouchableOpacity, Image } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import i18n from './service/i18n';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 6 && currentHour < 18;
    setIsDaytime(isDay);
  }, []); 

  const {t} = useTranslation();     // A ajouter pour le multi langue

  var type = t('garden')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ground}/> 
      <View style={[styles.days,isDaytime ? styles.day : styles.night]}>
        <View style={styles.top}>
          <TouchableOpacity style={[styles.luminary,isDaytime ? styles.sun : styles.moon]}/>
          <View style={styles.switch}>
            <Switch/>
            <Text>{type}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity>
              <Image source={require('./assets/panneau.png')} style={styles.sign}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/trees/tree1.png')} style={styles.tree}></Image>
            </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0F0',
    flexDirection: 'column-reverse'
  },
  ground:{
    width: '100%',
    height:'20%',
    backgroundImage: 'linear-gradient(to bottom, #7E6200 25%, transparent )'
    // 'linear-gradient(to bottom, #7E6200 75%, tra,sparent )'
  },
  days: {
    width: '100%',
    height:'80%',
    display: 'flex',
    flexDirection:'column'
  },
  day:{
    backgroundColor: "#B1E3FF",
  },
  night:{
    backgroundImage: "linear-gradient(to bottom, #020107 , #201b46)",
  },
  top:{
    width: '100%',
    height:'10%',
    justifyContent: "space-between",
    flexDirection:'row',
  },
  switch: {
    margin: ISLANDSCAPE ? "2%" : "5%",
  },
  luminary: {
    borderRadius: WIDTH,
    height: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    width: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    margin: ISLANDSCAPE ? "2%" : "5%",
  },
  sun:{
    backgroundColor: 'orange',
    boxShadow: '0 0 5px rgba(255,127,0,1), 0 0 30px rgba(255,127,0,1), 0 0 100px rgba(255,255,0,1), inset 0 0 40px rgba(255,255,0,1)',
  },
  moon:{
    backgroundColor: '#fae4a8',
    backgroundImage: 'radial-gradient(circle at 40% 80%, #ddc997 10%, transparent 0), radial-gradient(circle at 55% 70%, #ddc997 5%, transparent 0), radial-gradient(circle at 58% 85%, #ddc997 6%, transparent 0), radial-gradient(circle at 80% 40%, #ddc997 12%, transparent 0), radial-gradient(circle at 87% 58%, #ddc997 4%, transparent 0)',
  },
  bottom:{
    width: '100%',
    height: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  sign: {
    height: ISLANDSCAPE ? HEIGHT*0.25 : WIDTH*0.30,
    width : ISLANDSCAPE ? HEIGHT*0.25 : WIDTH*0.30,
    resizeMode: 'contain',
    marginBottom: ISLANDSCAPE ? -HEIGHT*0.025 : -WIDTH*0.03,
  },
  tree: {
    height: ISLANDSCAPE ? HEIGHT*0.50 : WIDTH*0.75,
    width : ISLANDSCAPE ? HEIGHT*0.50 : WIDTH*0.5,
    resizeMode: 'contain',
    marginBottom: ISLANDSCAPE ? -HEIGHT*0.05   : -WIDTH*0.055 ,
  }
});