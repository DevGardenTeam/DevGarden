import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelCommitComponent from '../components/button_label_commit_component';
import ModalCommitComponent from '../components/modal_commit_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { CommitViewController } from '../view-controllers/CommitViewController';
import { Commit } from '../model/Commit';
import DateUtils from '../helper/DateUtils';
import { useTheme } from '@react-navigation/native';

interface AllCommitsViewProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  platform: string;
  owner: string;
  repository: string;
}

const AllCommitsView: React.FC<AllCommitsViewProps> = ({ navigation }) => {
  const route = useRoute();
  const { platform, owner, repository } = route.params as RouteParams;
  const { colors } = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<null | Commit>(null);

  const { commits, loading, error, handleCommitPress, getAllCommits } = CommitViewController({ platform, owner, repository });

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
    <SafeAreaView style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
      <View style={styles.backButton}>
        <BackNavigationButton onPress={() => navigation.navigate("Project", {platform: platform, owner: owner, repository: repository})}/> 
      </View>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={[styles.titleText, { color: colors.text }]}>Commits</Text>
          <Text style={[styles.titleTextBis, { color: colors.text }]}>(master)</Text>
        </View>
        <View style={styles.contentView}>
          <FlatList             
            style={styles.flatList}
            data={commits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.masterLabel}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true);
                    setSelectedItem(item);
                  }}>
                  <ButtonLabelCommitComponent title={item.id} image="test" />
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false} 
          />
        </View>
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {setModalVisible(false)}}>
          <ModalCommitComponent 
            image={selectedItem?.author.photoUrl ?? ''} 
            username={selectedItem?.author.name ?? ''} 
            date={selectedItem?.date ? DateUtils.formatDate(selectedItem.date.toString()) : ''} 
            message={selectedItem?.message ?? ''} 
            branch={selectedItem?.id ?? ''} 
            id={selectedItem?.id ?? ''} 
            onSelect={() => {
              setModalVisible(false);
              setSelectedItem(null);
            }}
          ></ModalCommitComponent>        
        </Modal>
      </View>
    </SafeAreaView>
  );
};

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
    flexDirection: 'row',
    margin: 20,
  },
  titleText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 100,
    fontWeight: 'bold',
  },
  titleTextBis: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 50,
    color: 'gray',
  },
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
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
    width: '98%',
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
