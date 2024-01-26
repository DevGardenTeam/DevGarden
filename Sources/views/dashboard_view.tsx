import 'intl-pluralrules';
import { SafeAreaView, StyleSheet, Text, Dimensions, View, TouchableOpacity, Image, Platform, ScrollView  } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import "../service/i18n"
import React from 'react';
import { BarChart, PieChart } from "react-native-gifted-charts";
import BuildItem from "../components/build_item_component"

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
  
  // Build Stats

  var isBuild = false


  return (
    <ScrollView  style={styles.container}>
      <View style={styles.listTop}>
          <Text style={styles.title}>{t('projectView.dashboard')}</Text>
          <TouchableOpacity style={styles.cercle}>
            <Image source={require('../assets/dashboard_page_icon/tree.png')} style={styles.treeIcone}></Image>
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
          <Text style={styles.boxTitle}>{t('dashboard.languagesTitle')}</Text>
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
        <View style={styles.box}>
          <View style={styles.buildHeader}>
            <Image source={isBuild ? require("../assets/dashboard_page_icon/check_circle.png") : require("../assets/dashboard_page_icon/cross_circle.png")} style={styles.buildIcon}></Image>
            <Text style={[styles.buildTitle,isBuild ? { color: '#00D415' } : { color: '#FF0202' }]}>{isBuild ? "Build Passing" : "Build Error"}</Text>
          </View>
          <View>
            <View style={styles.itemsBox}>
              <BuildItem title='Bugs' iconSource={require("../assets/dashboard_page_icon/bug.png")} value={"0"} mark="A"></BuildItem>
              <BuildItem title={t('dashboard.security')} iconSource={require("../assets/dashboard_page_icon/lock_open.png")} value={"20"} mark="C"></BuildItem>
            </View>
            <View style={styles.itemsBox}>
              <BuildItem title='Smells' iconSource={require("../assets/dashboard_page_icon/bug.png")} value={"50"} mark="D"></BuildItem>
              <BuildItem title={t('dashboard.duplication')} iconSource={require("../assets/dashboard_page_icon/lock_open.png")} value={'5%'} mark="B"></BuildItem>
            </View>
          </View>
        </View>
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
  },
  buildHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'flex-start',
    width:'60%',
    backgroundColor:'#F9F9F9',
    borderColor:'#EBEBEB',
    borderWidth: 2,
    borderRadius: 5,
    padding: ISLANDSCAPE ? 4 : 2,
  },
  buildIcon: {
    resizeMode: 'contain',
    height: ISLANDSCAPE ? HEIGHT*0.05 : WIDTH*0.1,
    width: ISLANDSCAPE ? HEIGHT*0.05 : WIDTH*0.1
  },
  buildTitle: {
    fontSize: ISLANDSCAPE ? HEIGHT*0.05 : WIDTH*0.06,
    fontWeight:'bold',
    alignSelf:'center'
  },
  itemsBox: {
    flexDirection:'row',
    width:'100%',
    marginTop:'5%',
    marginBottom:'5%'
  }
});

export default DashBoardScreen;