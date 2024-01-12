import { SafeAreaView, StyleSheet, Text, TouchableOpacity,Switch, View, FlatList, Dimensions  } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import i18n from '../service/i18n';
import SettingsButton from '../components/settings_buttons_component';
import IconComponent from '../components/icon_component';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ParametersScreen: React.FC = () =>  {

    // Multi langue

    const {t} = useTranslation();     

    // DropDownPicker

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("null");
    const [items, setItems] = useState([
    {label: t('supportedLanguages.en'), value: t('supportedLanguages.en')},
    {label: t('supportedLanguages.fr'), value: t('supportedLanguages.fr')},
    {label: t('supportedLanguages.pt'), value: t('supportedLanguages.pt')}
  ]);

    // Switch

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}/> 
          <View style={styles.headerEllipseContainer }>
            <View style={styles.headerEllipse} />
          </View>
          <View style={styles.titlecontainer}>
            <IconComponent iconSource={require('../assets/settings.svg')} tintColor='#414141' width={ISLANDSCAPE ? WIDTH * 0.05 : WIDTH * 0.125} height={ISLANDSCAPE ? HEIGHT * 0.07 : HEIGHT * 0.07}/>
            <Text style={styles.title}>{t('settings.settings')}</Text>
          </View>
            <View style={styles.container_bis}>
              <View>
                {/* ListView */}
                <FlatList
                  data={[
                    {key: 'Mon projet perso'},
                    {key: "Dev'Garden"},
                  ]}
                  // Pour le binding remplacer l'item.key et le chemin de l'icon
                  renderItem={({item}) => <TouchableOpacity style={styles.listview}>
                    <IconComponent iconSource={require("../assets/gitlab.svg")} width={ISLANDSCAPE ? WIDTH * 0.075 : WIDTH * 0.15} height={ISLANDSCAPE ? HEIGHT * 0.07 : HEIGHT * 0.06}/>
                    <Text style={styles.titleAccount}>{item.key}</Text>
                    </TouchableOpacity>}
                />
              </View>
              <TouchableOpacity>
                  <View style={styles.part}>
                    <IconComponent iconSource={require('../assets/link.svg')} width={ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.085} height={ISLANDSCAPE ? HEIGHT * 0.07 : HEIGHT * 0.06}/>
                    <Text style={styles.text}>{t('settings.linkAccount')}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.part}>
                <IconComponent iconSource={require('../assets/half-moon-shape.svg')} width={ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.085} height={ISLANDSCAPE ? HEIGHT * 0.07 : HEIGHT * 0.06}/>
                <Text style={styles.text}>{t('settings.nightMode')}</Text>
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
                <IconComponent iconSource={require('../assets/internet.svg')} width={ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.085} height={ISLANDSCAPE ? HEIGHT * 0.07 : HEIGHT * 0.06}/>
                <Text style={styles.text}>{t('settings.language')}</Text>
                <View>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={t('supportedLanguages.'+i18n.language)}
                    searchable={true}
                    searchPlaceholder={t('settings.searchPlaceHolder')}
                    style={styles.DropDownPicker}
                    listItemLabelStyle={styles.ItemsStyle}
                    placeholderStyle={styles.ItemsStyle}
                    searchTextInputStyle={styles.searchTextInputStyle}/>
                </View>
              </View>
            </View>
            <SettingsButton title={t('settings.logOut')} iconSource={require('../assets/logout.svg')}></SettingsButton>
        </SafeAreaView>
  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F0F0',
  },
  // Header
  header:{
    backgroundColor: '#00A210',
    height: HEIGHT*0.2,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  headerEllipseContainer: {
    overflow: 'hidden',
    width: '100%', // Garde la fenêtre à 100%
    height: HEIGHT * 0.25,
  },
  headerEllipse: {
    backgroundColor: '#F1F0F0',
    height: ISLANDSCAPE ? WIDTH*4 : WIDTH*2 ,
    width: ISLANDSCAPE ? WIDTH*4 : WIDTH*2 ,
    borderRadius: ISLANDSCAPE ? WIDTH*4 / 2 : WIDTH*2 / 2 , 
    position: 'absolute',
    top: 50,
    left: ISLANDSCAPE ? -WIDTH * 1.5 : -WIDTH*0.5 ,
  },
  // Title
  titlecontainer:{
    display : "flex",
    flexDirection : "row",
    justifyContent:"center",
    alignItems:"center",
    marginTop: ISLANDSCAPE ? "-5%" : "-10%",
    marginBottom: ISLANDSCAPE ? "2%" : "5%",
  },
  title:{
    fontSize: ISLANDSCAPE ? WIDTH * 0.06 : WIDTH * 0.08,
    margin : ISLANDSCAPE ? "2%" : "4%",
    color:"#414141",
    fontWeight:"bold"
  },
  //Main Part
  container_bis: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'column-reverse',
    width: "80%",
    boxShadow: "0px 0px 28px 1px rgba(0,0,0,0.5)",
  },
  part:{
    padding: ISLANDSCAPE ? 5 : 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    margin: ISLANDSCAPE ? "0.2%" : "1%",
  },
  text:{
    fontSize: ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.055,
    fontWeight:"bold",
    marginLeft: ISLANDSCAPE ? "1%" : "3%",
    flex:2
  },
  //DropDownPicker
  DropDownPicker:{
    borderRadius: 30,
    border:"none",
    boxShadow: "0px 5px 10px 1px rgba(0,0,0,0.5)",
    width: '100%',
    marginLeft: ISLANDSCAPE ? "1%" : "3%",
  },
  ItemsStyle:{
    fontSize: ISLANDSCAPE ? WIDTH * 0.015 : WIDTH * 0.035,
    fontWeight:"500",
  },
  searchTextInputStyle:{
    border : "none",
    width: ISLANDSCAPE ? "20%" : "25%",
    flexWrap:"wrap",
    textOverflow: 'ellipsis'
  },
  //ListView
  listview:{
    display : "flex",
    flexDirection : "row",
    alignItems: "center",
    marginStart: ISLANDSCAPE ? "2%" : "5%"
  },
  titleAccount:{
    fontSize: ISLANDSCAPE ? WIDTH * 0.025 : WIDTH * 0.055,
    color:"#414141",
  },
});

export default  ParametersScreen;