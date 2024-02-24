import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelCommitComponent from '../components/button_label_commit_component';
import ModalCommitComponent from '../components/modal_commit_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { CommitViewController } from '../view-controllers/CommitViewController';

interface AllCommitsViewProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  owner: string;
  repository: string;
}

const AllCommitsView: React.FC<AllCommitsViewProps> = ({ navigation }) => {

  const route = useRoute();
  const { owner, repository } = route.params as RouteParams;

  const [isModalVisible, setModalVisible] = useState(false);

  const { commits, loading, error, handleCommitPress, getAllCommits } = CommitViewController({ owner, repository });

  useEffect(() => {
    getAllCommits();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.backButton}>
        <BackNavigationButton onPress={() => navigation.navigate("Project", {owner: owner, repository: repository})}/> 
      </View>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Commits</Text>
          <Text style={styles.titleTextBis}>(master)</Text>
        </View>
        <View style={styles.contentView}>
          <FlatList             
            style={styles.flatList}
            data={commits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.masterLabel}>
                <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                  <ButtonLabelCommitComponent title={item.id} image="test" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {setModalVisible(false)}}>
            <ModalCommitComponent image={''} username={''} date={''} message={''} branch={''} id={''} onSelect={() => {setModalVisible(false)}}></ModalCommitComponent>
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
  flatList:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  masterLabel: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AllCommitsView;
