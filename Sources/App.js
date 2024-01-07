import { SafeAreaView, StyleSheet, Text, View, Switch, Dimensions, TouchableOpacity } from 'react-native';
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
      <View style={isDaytime ? styles.day : styles.night}>
        <View style={styles.top}>
          <TouchableOpacity style={isDaytime ? styles.sun : styles.moon}/>
          <View style={styles.switch}>
            <Switch/>
            <Text>{type}</Text>
          </View>
        </View>
      </View>
      <View style={styles.ground}> 
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
  },
  ground:{
    width: '100%',
    height:'10%',
    backgroundColor: "#7E6200"
  },
  day:{
    backgroundColor: "#B1E3FF",
    width: '100%',
    height:'80%',
    display: 'flex',
    flexDirection:'column'
  },
  night:{
    backgroundColor: "#191970",
    width: '100%',
    height:'80%',
    display: 'flex',
    flexDirection:'column'
  },
  top:{
    width: '100%',
    height:'10%',
    justifyContent: "space-between",
    flexDirection:'row'
  },
  switch: {
    margin: ISLANDSCAPE ? "2%" : "5%",
  },
  sun:{
    borderRadius: WIDTH,
    height: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    width: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    backgroundColor: 'orange',
    boxShadow: '0 0 5px rgba(255,127,0,1), 0 0 30px rgba(255,127,0,1), 0 0 100px rgba(255,255,0,1), inset 0 0 40px rgba(255,255,0,1)',
    margin: ISLANDSCAPE ? "2%" : "5%",
  },
  moon:{
    borderRadius: WIDTH,
    margin: ISLANDSCAPE ? "2%" : "5%",
    height: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    width: ISLANDSCAPE ? HEIGHT*0.20 : WIDTH*0.25,
    backgroundColor: '#fae4a8',
    backgroundImage: 'radial-gradient(circle at 40% 80%, #ddc997 10%, transparent 0), radial-gradient(circle at 55% 70%, #ddc997 5%, transparent 0), radial-gradient(circle at 58% 85%, #ddc997 6%, transparent 0), radial-gradient(circle at 80% 40%, #ddc997 12%, transparent 0), radial-gradient(circle at 87% 58%, #ddc997 4%, transparent 0)',
  }
});