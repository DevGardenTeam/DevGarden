import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, Image } from 'react-native';
import ButtonLabelCommitComponent from '../components/button_label_commit_component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCommitComponent from '../components/modal_commit_component';
import BackNavigationButton from '../components/button_back_navigation_component';

const AllCommitsView = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.backButton}>
        <BackNavigationButton onPress={() => navigation.navigate("Project")}/> 
      </View>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Commits</Text>
          <Text style={styles.titleTextBis}>(master)</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.masterLabel}>
            <TouchableOpacity onPress={toggleModal}>
              <ButtonLabelCommitComponent title="#1565s8" image="test" />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
            <ModalCommitComponent image={''} username={''} date={''} message={''} branch={''} id={''} onSelect={toggleModal}></ModalCommitComponent>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F1F0F0',
  },
  backButton:{
    margin: 20,
  },
  mainView: {
    flex: 1,
    margin: '10%',
    display: 'flex',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
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
  contentView: {
    display: 'flex',
    flexDirection: 'row',
  },
  masterLabel: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
});

export default AllCommitsView;
