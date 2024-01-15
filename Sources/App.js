import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, Button } from 'react-native';
import { RepositoryController } from './view-controllers/RepositoryViewController';

export default function App() {
  const { repositories, loading, error, handleRepositoryPress, fetchRepositories } = RepositoryController();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 5 && currentHour < 18;
    setIsDaytime(isDay);
  }, []); 


  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container2}>
    <View style={styles.listTop}>
      <View style={styles.switch}>
        <Text style={[styles.text,isDaytime ? styles.textDay : styles.textNight]}>Choisissez un projet</Text>
      </View>
    </View>
    <View style={styles.mainContent}>
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRepositoryPress(item.id)}>
            <View>
              <Button title={item.name}/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  </SafeAreaView>

  );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0F0',
    flexDirection: 'column-reverse'
  },
  top:{
    width: '100%',
    justifyContent: "space-between",
    flexDirection:'row',
  },
  textDay: {
    color:'black'
  },
  textNight: {
    color:'white'
  },

  // LIST VIEW
  container2: {
    flex: 1,
    backgroundColor: '#F1F0F0',
  },
  listTop:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  mainContent:{
    display: 'flex',
    marginLeft: WIDTH/4,
    marginRight: WIDTH/4,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  }
})
