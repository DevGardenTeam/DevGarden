import { SafeAreaView, StyleSheet, Text, TouchableOpacity,Switch, View, Image } from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import './service/i18n';
import SettingsButton from './components/settings_buttons_component';
import IconComponent from './components/icon_component';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


export default function App() {
    const {t} = useTranslation();     // A ajouter pour le multi langue

    // DropDownPicker

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
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
          <div style={styles.titlecontainer}>
            <IconComponent iconSource={require('./assets/settings.svg')} tintColor='#414141' width={40} height={40}/>
            <Text style={styles.title}>{t('settings.settings')}</Text>
          </div>
            <div style={styles.container_bis}>
              <div style={styles.part}>
                <IconComponent iconSource={require('./assets/internet.svg')} />
                <Text style={styles.text}>{t('settings.language')}</Text>
                <div>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    searchable={true}
                    style={styles.DropDownPicker}
                    dropDownContainerStyle={styles.DropDownPickerContainer}
                    searchContainerStyle={styles.DropDownPickerContainer}
                    listItemLabelStyle={styles.ItemsStyle}
                    placeholderStyle={styles.ItemsStyle}
                    searchTextInputStyle={styles.searchTextInputStyle}/>
                </div>
              </div>
              <div style={styles.part}>
                <IconComponent iconSource={require('./assets/half-moon-shape.svg')}/>
                <Text style={styles.text}>{t('settings.night_mode')}</Text>
                <div style={styles.buttonPart}>
                  <Switch trackColor={{false: '#D3D3D3', true: '#B9FFB6'}}
                  thumbColor={isEnabled ? '#00A210' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}/>
                </div>
              </div>
                <TouchableOpacity>
                  <View style={styles.part}>
                    <IconComponent iconSource={require('./assets/link.svg')}/>
                    <Text style={styles.text}>{t('settings.link_account')}</Text>
                </View>
              </TouchableOpacity>
              <div>
                {/* ListView */}
              </div>
            </div>
            <SettingsButton title={t('settings.log_out')} iconSource={require('./assets/logout.svg')}></SettingsButton>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F1F0F0',
    },
    // Title
    titlecontainer:{
      display : "flex",
      flexDirection : "row",
      justifyContent:"center",
      alignItems:"center",
      marginBottom:"5%"
    },
    title:{
      fontSize:35,
      margin : "5%",
      marginLeft:"20%",
      color:"#414141",
      fontWeight:"bold"
    },
    //Main Part
    container_bis: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      display: 'flex',
      paddingLeft: 5,
      paddingRight: 5,
      flexDirection: 'column',
      width:"75%",
      boxShadow: "0px 0px 28px 1px rgba(0,0,0,0.5)",
    },
    part:{
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "flex-start",
      margin:"0.2%"
    },
    text:{
      fontSize:20,
      fontWeight:"bold",
      marginLeft:"3%",
      flex:2
    },
    //DropDownPicker
    DropDownPicker:{
      borderRadius: 30,
      border:"none",
      boxShadow: "0px 5px 10px 1px rgba(0,0,0,0.5)",
    },
    DropDownPickerContainer:{
      border:"none",
    },
    ItemsStyle:{
      fontSize:"15",
      fontWeight:"500",
    },
    searchTextInputStyle:{
      border : "none",
      width:"25%"
    }
  });