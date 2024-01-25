import 'intl-pluralrules';
import { SafeAreaView, StyleSheet, Text, Dimensions, View, TouchableOpacity, Image, Platform, ScrollView  } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import "../service/i18n"
import React from 'react';
import { BarChart, PieChart } from "react-native-gifted-charts";

const DashBoardScreen: React.FC = () => {
  const {t} = useTranslation();     // A ajouter pour le multi langue

  // Activity Data

  const barChartData = [
    {value: 1, label: 'Lou', frontColor: 'red',
      topLabelComponent: () => (<Text style={{color: 'red', fontSize: 25}}>1</Text>)},
    {value: 5, label: 'Nicolas', frontColor: 'blue',
      topLabelComponent: () => (<Text>5</Text>)},
    {value: 3, label: 'Bruno', frontColor: 'yellow',
      topLabelComponent: () => (<Text style={{color: 'black', fontSize: 18, marginBottom: 1}}>3</Text>)},
    {value: 2, label: 'Tim', frontColor: 'green',
      topLabelComponent: () => (<Text style={{color: 'black', fontSize: 18, marginBottom: 1}}>2</Text>)},
  ]

  // Languages used

  const pieData = [
    {
      value: 47,
      color: '#009FFF',
    },
    {value: 34, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];

  const progressChartData = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const progressChartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    barRadius: 5
  };

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  }
  
  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: 'black'}}>React Native: {pieData[0].value}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#8F80F3')}
            <Text style={{color: 'black'}}>Typescripts: {pieData[1].value}%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: 'black'}}>C#: {pieData[2].value}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: 'black'}}>Bash: {pieData[3].value}%</Text>
          </View>
        </View>
      </>
    );
  };
  

  return (
    <ScrollView  style={styles.container}>
      <View style={styles.listTop}>
          <Text style={styles.title}>{t('projectView.dashboard')}</Text>
          <TouchableOpacity style={styles.cercle}>
            <Image source={require('../assets/tree.png')} style={styles.treeIcone}></Image>
          </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{t('dashboard.activityTitle')}</Text>
          <BarChart 
            data={barChartData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            // hideYAxisText
            roundedTop
            />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{t('dashboard.activityTitle')}</Text>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}   
          />
          {renderLegendComponent()}
        </View>
        <View></View>
      </View>
      
    </ScrollView >
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
    alignItems: 'center',
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
      width: '80%',
      marginBottom:'10%'
  },
  boxTitle :{
    alignSelf:'flex-start',
    fontSize: ISLANDSCAPE ? HEIGHT*0.05 : WIDTH*0.07,
  },
  barchart: {
    alignSelf:'flex-end',
  }
});

export default DashBoardScreen;