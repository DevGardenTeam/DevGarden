import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonMultiSelectPlatformComponent from '../components/button_multiselect_platform_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { useTheme } from '@react-navigation/native';

interface AllPlatformsNeutralViewProps {
  navigation: StackNavigationProp<any>;
}

const AllPlatformsNeutralView: React.FC<AllPlatformsNeutralViewProps> = ({ navigation }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { colors } = useTheme();

  return (
      <SafeAreaView style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
          <View style={styles.backButton}>
            <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
          </View>
          <View style={styles.mainView}>
              <View style={styles.titleView}>
                  <Text style={[styles.titleText, { color: colors.text }]}>{selectedPlatform}</Text>
              </View>
              <View style={styles.contentView}>
                <TouchableOpacity style={styles.mainContent} onPress={() => navigation.navigate("AllProjects", {platform: selectedPlatform?.toLowerCase()})}>
                  <View >

                  </View>                
                </TouchableOpacity>
    
                <View style={styles.slidingButton}>
                  <ButtonMultiSelectPlatformComponent onSelect={(platform) => setSelectedPlatform(platform)}></ButtonMultiSelectPlatformComponent>
                </View>                  
              </View>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backButton:{
    margin: 20,
  },
  mainView: {
    flex: 1,
    display: 'flex',
  },
  titleView: {
    display: 'flex',
    margin: 20,
  },
  titleText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 100,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
  },
  mainContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '50%',
    marginBottom: '10%',
  },
  slidingButton:{
      backgroundColor: '#E7E7E7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      height: '20%',
  }
})

export default AllPlatformsNeutralView;