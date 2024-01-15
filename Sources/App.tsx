import 'intl-pluralrules';
import { SafeAreaView, StyleSheet, Text, Dimensions, View, TouchableOpacity, Image, Platform } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import "./service/i18n"
import React from 'react';
import { BarChart } from "react-native-chart-kit";

const DashBoardScreen: React.FC = () => {
  const {t} = useTranslation();     // A ajouter pour le multi langue

  // Activity Data

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    barRadius: 5
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTop}>
          <Text style={styles.title}>{t('projectView.dashboard')}</Text>
          <TouchableOpacity style={styles.cercle}>
            <Image source={require('./assets/tree.png')} style={styles.treeIcone}></Image>
          </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{t('dashboard.activityTitle')} </Text>
          <BarChart 
              data={data}
              width={500}
              height={350}              
              chartConfig={chartConfig}
              showValuesOnTopOfBars={true}
              withHorizontalLabels={false}
              showBarTops={false}
              fromZero={true}
              withInnerLines={false}
              yAxisLabel={'test'}
              yAxisSuffix={'test'}
          />
        </View>
        <View></View>
        <View></View>
      </View>
      
    </SafeAreaView>
  );
}

// t('[key]') => valeur directe dans le json
// t('[key].[2nd_key]') => valeur indirecte dans le json

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0F0',
  },
  listTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    fontSize: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.12,
    margin: ISLANDSCAPE ? HEIGHT*0.045 : WIDTH*0.080,
  },
  cercle:{
    display: 'flex',
    width: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.15,
    height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.15,
    borderRadius: WIDTH, 
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'black',
    alignContent:'center',
    alignItems:'center',
    margin: ISLANDSCAPE ? HEIGHT*0.045 : WIDTH*0.080,
  },
  treeIcone:{
    resizeMode: 'contain',
    height:'100%',
    width:'100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F1F0F0',
    alignItems: 'center'
  },
  box : {
    backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
      boxShadow: "0px 0px 14px 1px rgba(0,0,0,0.25)",
      width: '80%'
  },
  boxTitle :{
    alignSelf:'flex-start'
  }
});

export default DashBoardScreen;