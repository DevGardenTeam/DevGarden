import 'intl-pluralrules';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, BackHandler } from 'react-native';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import i18n from '../service/i18n';
import SettingsButton from '../components/settings_buttons_component';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { moderateScale, verticalScale, horizontalScale } from '../service/Metrics';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import MetricsUtils from '../helper/MetricsUtils';
import BackNavigationButton from '../components/button_back_navigation_component';
import { StackNavigationProp } from '@react-navigation/stack';
import LinkAccountView from '../components/parameters/link_accounts';
import { useUser } from '../user/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ParametersProps {
  navigation: StackNavigationProp<any>;
}

const ParametersScreen: React.FC<ParametersProps> = ({ navigation }) => {
  // Multi langue
  const { t } = useTranslation();
  const { user } = useUser();

  // DropDownPicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(i18n.language);
  const [items, setItems] = useState([
    { label: t('supportedLanguages.en'), value: 'en' },
    { label: t('supportedLanguages.fr'), value: 'fr' },
    { label: t('supportedLanguages.pt'), value: 'pt' }
  ]);

  const changeLanguage = (selectedLanguage: string) => {
    i18n.changeLanguage(selectedLanguage);
    setValue(selectedLanguage);
  };

  // Metrics
  const [priority, setPriority] = useState<string>("");
  const [openPriority, setOpenPriority] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedMonth = await AsyncStorage.getItem('currentMonth');
      const savedPriority = await AsyncStorage.getItem('priority');

      if (savedMonth !== null) {
        setCurrentMonth(savedMonth);
        MetricsUtils.setSelectedCommitMonth(parseInt(savedMonth, 10));
      }
      if (savedPriority !== null) {
        setPriority(savedPriority);
        MetricsUtils.setSelectedCommitPriority(savedPriority);
      }
    };

    loadSettings();
  }, []);

  const handlePriorityChange = async (priority: string) => {
    MetricsUtils.setSelectedCommitPriority(priority);
    setPriority(priority);
    await AsyncStorage.setItem('priority', priority);
  };

  const handleMonthChange = async (month: string) => {
    const numericValue = month.replace(/[^0-9]/g, '');
    const numericMonth = parseInt(numericValue, 10);

    if (!isNaN(numericMonth)) {
      MetricsUtils.setSelectedCommitMonth(numericMonth);
    }

    setCurrentMonth(numericValue); // Always update the state, even if it's an empty string
    await AsyncStorage.setItem('currentMonth', numericValue);
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return false; // Disable back button
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.navigationBack}>
        <BackNavigationButton />
      </View>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>{t('settings.settings')}</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container_bis}>
          <View style={styles.part}>
            <View style={styles.leftPart}>
              <LinkAccountView user={user} />
            </View>
          </View>
          <View style={styles.part}>
            <View style={styles.leftPart}>
              <Image source={require('../assets/setting_page_icon/link.png')} style={styles.partIcon} />
              <Text style={styles.text}>{t('settings.linkAccount')}</Text>
            </View>
          </View>
          <View style={styles.part}>
            <View style={styles.leftPart}>
              <Image source={require('../assets/setting_page_icon/internet.png')} style={styles.partIcon} />
              <Text style={styles.text}>{t('settings.language')}</Text>
            </View>
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(value: string) => { changeLanguage(value); }}
                placeholder={t('supportedLanguages.' + i18n.language)}
                style={styles.DropDownPicker}
                listItemLabelStyle={styles.itemsStyle}
                placeholderStyle={styles.itemsStyle} />
            </View>
          </View>
        </View>
        <View style={styles.calculatorContainer}>
          <Text style={[styles.calculatorTitle, { color: colors.text }]}>{t("settings.qualityCoef")}</Text>
          <View style={styles.secondContainer}>
            <View style={styles.inputRow}>
              <Text style={[styles.rowName, { color: colors.text }]}>{t("settings.lastCommit")}</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={currentMonth}
                  onChangeText={handleMonthChange}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Text style={[styles.rowName, { color: colors.text }]}>{t("settings.month")}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={[styles.rowName, { color: colors.text }]}>{t("settings.priority")}</Text>
              <View>
                <DropDownPicker
                  open={openPriority}
                  value={priority}
                  items={MetricsUtils.qualityCommitMetrics.priorities}
                  setOpen={setOpenPriority}
                  setValue={setPriority}
                  onChangeValue={(value: string) => handlePriorityChange(value)}
                  placeholder={MetricsUtils.qualityCommitMetrics.priorities[3].label}
                  style={styles.DropDownPicker}
                  listItemLabelStyle={[styles.itemsStyle, { color: colors.text }]}
                  placeholderStyle={[styles.itemsStyle, { color: colors.text }]}
                />
              </View>
            </View>
          </View>
        </View>
        <SettingsButton title={t('settings.logOut')} iconSource={require('../assets/setting_page_icon/logout.png')} tint={"red"} navigation={navigation}></SettingsButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: verticalScale(5),
    marginTop: verticalScale(20),
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  navigationBack: {
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex: 1
  },
  // Title
  titlecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(40),
    color: "#414141",
    fontWeight: "bold"
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
    width: "85%",
    elevation: 4,
    alignItems: 'center',
  },
  dropDownContainer: {
    flex: 1,
    maxWidth: '40%',
  },
  part: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(7),
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginLeft: horizontalScale(2),
    flexWrap: 'nowrap'
  },
  partIcon: {
    resizeMode: 'contain',
    width: horizontalScale(40),
    height: verticalScale(40),
    marginRight: horizontalScale(5),
  },

  secondContainer: {
    flexDirection: 'column',
    marginTop: 15,
  },

  DropDownPicker: {
    borderColor: '#ccc',
    borderRadius: 15,
    borderBlockColor: 'none',
    elevation: 1,
    width: horizontalScale(120),
    marginLeft: horizontalScale(20),
  },
  itemsStyle: {
    fontSize: moderateScale(15),
    fontWeight: "500",
  },
  //Calculator
  calculatorContainer: {
    backgroundColor: '#FFFFFF',
    height: '30%',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: "85%",
    elevation: 4,
  },
  calculatorTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#414141',
  },

  rowName: {
    fontSize: moderateScale(15),
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: moderateScale(15),
  },
  inputView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: horizontalScale(20),
  }
});

export default ParametersScreen;
