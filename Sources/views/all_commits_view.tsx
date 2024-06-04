import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, TouchableOpacity, Image, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelCommitComponent from '../components/button_label_commit_component';
import ModalCommitComponent from '../components/modal_commit_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { CommitViewController } from '../view-controllers/CommitViewController';
import { Commit } from '../model/Commit';
import DateUtils from '../helper/DateUtils';
import { useTheme } from '@react-navigation/native';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';

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
      <View style={styles.top}>
        <View style={styles.navigationBack}>
          <BackNavigationButton onPress={() => navigation.navigate("Project", { platform, owner, repository })} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: colors.text }]}>Commits</Text>
          <Text style={[styles.titleTextBis, { color: colors.text }]}> (master)</Text>
        </View>
      </View>

      <View style={styles.mainView}>
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
                  <View style={styles.itemContainer}>
                    <View style={styles.textInfoContainer}>
                      <Text style={[styles.commitMessage, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                        {item.message}
                      </Text>
                      <Text style={[styles.commitAuthor, { color: colors.text }]}>
                        {item.author.name}
                      </Text>
                      <Text style={[styles.commitAuthor, { color: colors.text }]}>
                        {item.date ? DateUtils.formatDate(item.date.toString()) : ''}
                      </Text>
                    </View>
                    <Image
                      source={require('../assets/icons/right_arrow.png')}
                      style={styles.icon}
                    />
                  </View>
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
          onRequestClose={() => { setModalVisible(false); }}>
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
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: verticalScale(15)
  },
  navigationBack: {
    position: "absolute",
    top: verticalScale(15),
    left: horizontalScale(15),
    zIndex: 1,
  },
  titleContainer: {
    flex: 1, // Pour que le conteneur du titre occupe tout l'espace restant
    alignItems: 'center', // Pour centrer horizontalement le texte
  },
  titleText: {
    fontSize: moderateScale(35),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleTextBis: {
    alignItems: 'flex-end',
    fontSize: moderateScale(25),
    color: 'gray',
  },
  icon: {
    width: 24, 
    height: 24,
  },
  mainView: {
    flex: 1,
  },
  contentView: {
    flexDirection: 'row',
  },
  flatList: {
    flex: 1,
    marginHorizontal: horizontalScale(15),
  },
  masterLabel: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  commitMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commitAuthor: {
    fontSize: 14,
  },
});

export default AllCommitsView;
