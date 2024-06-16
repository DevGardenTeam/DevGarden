import 'intl-pluralrules';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity,Switch, View, FlatList, Dimensions, Image, Platform, TextInput  } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import i18n from '../service/i18n';
import SettingsButton from '../components/settings_buttons_component';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {moderateScale, verticalScale, horizontalScale} from '../service/Metrics';
import { useTheme } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import MetricsUtils from '../helper/MetricsUtils';
import BackNavigationButton from '../components/button_back_navigation_component';
import { StackNavigationProp } from '@react-navigation/stack';
import LinkAccountView from '../components/parameters/link_accounts';
import GithubAuth from '../auth/github';
import { useUser } from '../user/UserContext';

interface ParametersProps {
  navigation: StackNavigationProp<any>;
}

const ParametersScreen: React.FC<ParametersProps> = ({ navigation }) =>{

  // Multi langue

  const {t} = useTranslation();  
  const { user } = useUser(); 

  // DropDownPicker

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(i18n.language); 
  const [items, setItems] = useState([
    {label: t('supportedLanguages.en'), value: 'en'},
    {label: t('supportedLanguages.fr'), value: 'fr'},
    {label: t('supportedLanguages.pt'), value: 'pt'}
  ]);

  const changeLanguage = (selectedLanguage: string) => { 
    i18n.changeLanguage(selectedLanguage);
    setValue(selectedLanguage);
  };

  // Metrics
  
  const [priority, setPriority] = useState<string>("");
  const [openPriority, setOpenPriority] = useState(false);

  const handlePriorityChange = (priority: string) => {
    MetricsUtils.setSelectedCommitPriority(priority);
    setPriority(priority);
  };

  const handleMonthChange = (month: string) => {
    const numericValue = month.replace(/[^0-9]/g, '');
    const numericMonth = parseInt(numericValue, 10);

    if (!isNaN(numericMonth)) {
      MetricsUtils.setSelectedCommitMonth(numericMonth);
      setCurrentMonth(numericValue);
    }
  };

  const [currentMonth, setCurrentMonth] = useState('');

  const { colors } = useTheme();

  useEffect(() => {
    setItems([
      { label: t('supportedLanguages.en'), value: 'en' },
      { label: t('supportedLanguages.fr'), value: 'fr' },
      { label: t('supportedLanguages.pt'), value: 'pt' }
    ]);
  }, [i18n.language]);

    // Switch

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          {/* <View style={styles.header}/> 
          <View style={styles.headerEllipseContainer }>
            <View style={styles.headerEllipse} />
          </View> */}
          <View style={styles.titlecontainer}>
            <BackNavigationButton/>
            <Text style={styles.title}>{t('settings.settings')}</Text>
          </View>
            <View style={styles.container_bis}>
              <View>
                <LinkAccountView user={user}/>
              </View>
              <TouchableOpacity>
                <View style={styles.part}>
                  <View style={styles.leftPart}>
                    <Image source={require('../assets/setting_page_icon/link.png')} style={styles.partIcon}/>
                    <Text style={styles.text}>{t('settings.linkAccount')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.part}>
                <View style={styles.leftPart}>
                  <Image source={require('../assets/setting_page_icon/half_moon.png')} style={styles.partIcon}/>
                  <Text style={styles.text}>{t('settings.nightMode')}</Text>
                </View>
                <View>
                  <Switch trackColor={{false: '#D3D3D3', true: '#B9FFB6'}}
                  thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], height: ISLANDSCAPE ? HEIGHT * 0.025 : HEIGHT * 0.025 , marginRight: ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.02}}/>
                </View>
              </View>
              <View style={styles.part}>
                <View style={styles.leftPart}>
                  <Image source={require('../assets/setting_page_icon/internet.png')} style={styles.partIcon}/>
                  <Text style={styles.text}>{t('settings.language')}</Text>
                </View>
                <View style={styles.dropDownContainer}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(value: string)=> { changeLanguage(value);}}
                    placeholder={t('supportedLanguages.'+i18n.language)}
                    searchable={true}
                    searchPlaceholder={t('settings.searchPlaceHolder')}
                    style={styles.DropDownPicker}
                    listItemLabelStyle={styles.itemsStyle}
                    placeholderStyle={styles.itemsStyle}/>
                </View>
              </View>
            </View>
            <View style={styles.calculatorContainer}>
                <Text style={[styles.calculatorTitle, { color: colors.text }]}>Coefficients de qualité</Text>
                <View style={styles.inputRow}>
                    <Text style={[styles.rowName, { color: colors.text }]}>Nombre de mois limite depuis le dernier commit :</Text>
                    <View style={styles.inputView}>
                      <TextInput value={currentMonth}
                                onChangeText={handleMonthChange}
                                keyboardType="numeric"
                                style={styles.input}/>     
                      <Text style={[styles.rowName, { color: colors.text }]}>Mois</Text>            
                    </View>
                    <Text style={[styles.rowName, { color: colors.text }]}>Priorité :</Text>
                    <View style={styles.dropDownContainer}>
                      <DropDownPicker
                        open={openPriority}
                        value={priority}
                        items={MetricsUtils.qualityCommitMetrics.priorities}
                        setOpen={setOpenPriority}
                        setValue={setPriority}
                        onChangeValue={(value: string) => handlePriorityChange(value)}
                        placeholder={"Select a priority..."}
                        style={styles.DropDownPicker}
                        listItemLabelStyle={[styles.itemsStyle, { color: colors.text}]}
                        placeholderStyle={[styles.itemsStyle, { color: colors.text}]}
                      />
                    </View>
                </View>
            </View>
            <SettingsButton title={t('settings.logOut')} iconSource={require('../assets/setting_page_icon/logout.png')} tint={"red"}></SettingsButton>
        </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#F1F0F0',
  },
  // // Header
  // header:{
  //   backgroundColor: 'red',
  //   height: verticalScale(15),
  //   width: '100%',
  // },
  // headerEllipseContainer: {
  //   overflow: 'hidden',
  //   width: '100%', // Garde la fenêtre à 100%
  //   height: HEIGHT * 0.25,
  // },
  // headerEllipse: {
  //   backgroundColor: '#F1F0F0',
  //   height: ISLANDSCAPE ? WIDTH*4 : WIDTH*2 ,
  //   width: ISLANDSCAPE ? WIDTH*4 : WIDTH*2 ,
  //   borderRadius: ISLANDSCAPE ? WIDTH*4 / 2 : WIDTH*2 / 2 , 
  //   position: 'absolute',
  //   top: 50,
  //   left: ISLANDSCAPE ? -WIDTH * 1.5 : -WIDTH*0.5 ,
  // },
  // Title
  titlecontainer:{
    display : "flex",
    flexDirection : "row",
    justifyContent:"center",
    alignItems:"center",
    marginTop: verticalScale(50)
  },
  title:{
    fontSize: moderateScale(40),
    marginHorizontal: horizontalScale(25),
    marginVertical: verticalScale(25),
    color:"#414141",
    fontWeight:"bold"
  },
  settingsIcon: {
    resizeMode: 'contain',
    width: horizontalScale(60),
    height: verticalScale(60),
  },
  //Main Part
  container_bis: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column-reverse',
    width: "80%",
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
  },
  part:{
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(7),
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  leftPart:{
    display:'flex',
    flexDirection:'row',justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize: moderateScale(15),
    fontWeight:"bold",
    marginLeft: horizontalScale(2),
    flexWrap:'nowrap'
  },
  partIcon: {
    resizeMode: 'contain',
    width: horizontalScale(50),
    height: verticalScale(50)
  },
  //DropDownPicker
  dropDownContainer: {
    height:'100%',
  },
  DropDownPicker:{
    borderRadius: 20,
    borderBlockColor:'none',
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
    width: horizontalScale(135),
    height : verticalScale(15),
  },
  itemsStyle:{
    fontSize: moderateScale(15),
    fontWeight:"500",
  },
  //ListView
  listview:{
    display : "flex",
    flexDirection : "row",
    alignItems: "center",
    marginBottom: verticalScale(5)
  },
  titleAccount:{
    fontSize: moderateScale(15),
    color:"#414141",
  },
  platformIcon: {
    resizeMode: 'contain',
    width: horizontalScale(45), 
    height: verticalScale(45),
    marginLeft: horizontalScale(30),
  },
  //Calculator
  calculatorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: "80%",
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
  },
  calculatorTitle: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#414141',
  },
  inputRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      gap: 10,
  },
  rowName: {
      fontSize: moderateScale(15),
  },
  sliderValue: {
    marginTop: -20,
    fontSize: 18,
  },
  slider: {
      width: 200, // Ajustez la largeur du Slider selon vos besoins
      height: 40, // Ajustez la hauteur du Slider selon vos besoins
  },
  input: {
      width: '10%',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: moderateScale(15),
      marginRight: 10
  },
  resultContainer: {
      marginTop: 20,
  },
  resultText: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: '#414141',
      marginBottom: 10,
  },
  gradeItem: {
      fontSize: moderateScale(15),
      color: '#414141',
      marginBottom: 5,
  },
  navigationBack: {
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex:1,
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default  ParametersScreen;