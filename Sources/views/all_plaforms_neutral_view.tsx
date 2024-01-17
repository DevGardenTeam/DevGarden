import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

const AllPlatformsNeutralView: React.FC = () => {

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainView}>
                <View>
                    <View>
                        <Text style={styles.titleText}>Gitlab</Text>
                    </View>
                </View>
                <View style={styles.mainContent}>

                </View>  
                <View style={styles.slidingButton}>

                </View>  
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: '#F1F0F0',
    },
    mainView: {
      flex: 1,
      margin: '10%'
    },
    titleText: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: 40,
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