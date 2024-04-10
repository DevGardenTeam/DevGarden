import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, Image } from 'react-native';

const DetailsIssueView = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Issue Example Title</Text>
          <Text style={styles.titleTextBis}>#4653</Text>
        </View>
        <View style={styles.horizontalBar}/>
        <View style={styles.squareContainer}>
            <Image source={{ uri: 'https://example.com/your-image.jpg' }}
                style={styles.image}/>
        </View>
        <View style={styles.littleHorizontalBar}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F1F0F0',
  },
  mainView: {
    flex: 1,
    margin: '10%',
    display: 'flex',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 40,
  },
  titleTextBis: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 30,
    color: 'gray',
  },
  horizontalBar: {
    width: '90%',
    height: 1, 
    backgroundColor: 'gray', 
    marginHorizontal: '5%',
  },
  littleHorizontalBar: {
    width: '20%',
    height: 1, 
    backgroundColor: 'gray', 
    marginHorizontal: '5%',
  },
  squareContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 16,
    overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bordures
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default DetailsIssueView;
