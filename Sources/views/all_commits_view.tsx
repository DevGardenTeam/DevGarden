import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StatusBar, TextInput, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import ModalCommitComponent from '../components/modal_commit_component';
import { CommitViewController } from '../view-controllers/CommitViewController';
import { Commit } from '../model/Commit';
import DateUtils from '../helper/DateUtils';
import { useTheme } from '@react-navigation/native';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import { Repository } from '../model/Repository';
import Modal from 'react-native-modal';
import fontSizes from '../constants/fontSize';
import { BranchViewController } from '../view-controllers/BranchViewController';

interface AllCommitsViewProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  repository: Repository;
}

const AllCommitsView: React.FC<AllCommitsViewProps> = ({ navigation }) => {
  const route = useRoute();
  const { repository } = route.params as RouteParams;
  const { colors } = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | Commit>(null);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>();
  const [isBranchModalVisible, setBranchModalVisible] = useState(false); // New state for branch selection modal

  const { branches, loading, error, getAllBranches } = BranchViewController({
    platform: repository.platform,
    owner: repository.owner.name,
    repository: repository.name,
  });

  useEffect(() => {
    getAllBranches();
  }, []);

  useEffect(() => {
    if (branches.length > 0) {
      const mainBranch = branches[0];
      setSelectedBranch(mainBranch.name);
    }
  }, [branches]);

  useEffect(() => {
    if (selectedBranch) {
      const branchCommits = branches.find(branch => branch.name === selectedBranch)?.commits || [];
      setFilteredCommits(
        branchCommits
          .filter(commit =>
            commit.message?.toLowerCase().includes(searchText.toLowerCase()) ||
            commit.author.name?.toLowerCase().includes(searchText.toLowerCase())
          )
          .sort((a, b) => {
            if (sortOrder === 'asc') {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
          })
      );
    }
  }, [selectedBranch, searchText, sortOrder]);

  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([]);

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
          <BackNavigationButton />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: colors.text }]}>Commits</Text>
          <View style={styles.titleContainerBis}>
            <Text style={[styles.titleTextBis, { color: colors.text }]}>Branch :</Text>
            <TouchableOpacity onPress={() => setBranchModalVisible(true)} style={styles.branchButton}>
              <Text style={{ color: colors.text }}>{selectedBranch ?? 'Select Branch'}</Text>
            </TouchableOpacity>            
          </View>
        </View>
        <View style={styles.navigationPlaceholder} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: colors.text, borderColor: '#ccc' }]}
          placeholder="Search commits..."
          placeholderTextColor={colors.text}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortButton, sortOrder === 'asc' && styles.selectedSort]}
            onPress={() => setSortOrder('asc')}
          >
            <Text style={styles.sortText}>Asc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortOrder === 'desc' && styles.selectedSort]}
            onPress={() => setSortOrder('desc')}
          >
            <Text style={styles.sortText}>Desc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainView}>
        <View style={styles.contentView}>
          <FlatList
            style={styles.flatList}
            data={filteredCommits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.masterLabel}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(true);
                  setSelectedItem(item);
                }}>
                  <View style={styles.itemContainer}>
                    <View style={styles.textInfoContainer}>
                      <Text style={[styles.commitDate, { color: colors.text }]}>
                        {item.date ? DateUtils.formatDate(item.date.toString()) : ''}
                      </Text>
                      <Text style={[styles.commitAuthor, { color: colors.text }]}>
                        {item.author.name ?? ''}
                      </Text>
                      <Text style={[styles.commitMessage, { color: colors.text, flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                        {item.message ?? ''}
                      </Text>
                    </View>
                    <Image
                      source={require('../assets/icons/right_arrow.png')}
                      style={[styles.icon, { tintColor: colors.text }]}
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
          isVisible={isModalVisible}
          onSwipeComplete={() => { setModalVisible(false); setSelectedItem(null); }}
          swipeDirection="down"
          onBackdropPress={() => { setModalVisible(false); setSelectedItem(null); }}
          onBackButtonPress={() => { setModalVisible(false); setSelectedItem(null); }}
          backdropOpacity={0.5}
        >
          <View style={styles.modalView}>
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
            />
          </View>
        </Modal>
        <Modal
          isVisible={isBranchModalVisible}
          onBackdropPress={() => setBranchModalVisible(false)}
          onBackButtonPress={() => setBranchModalVisible(false)}
          backdropOpacity={0.5}
        >
          <View style={[styles.branchModalView, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Branch</Text>
            {branches.map(branch => (
              <TouchableOpacity
                key={branch.name}
                style={styles.branchItem}
                onPress={() => {
                  setSelectedBranch(branch.name);
                  setBranchModalVisible(false);
                }}
              >
                <Text style={{ color: colors.text }}>{branch.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: verticalScale(15),
  },
  navigationBack: {
    marginLeft: horizontalScale(15),
  },
  navigationPlaceholder: {
    width: horizontalScale(90),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainerBis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10), // Ajouté pour un meilleur alignement vertical
  },
  titleText: {
    fontSize: fontSizes.xlarge,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleTextBis: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    marginRight: horizontalScale(5), // Ajouté pour espacer le texte du bouton
  },
  branchButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  icon: {
    width: fontSizes.iconSmall,
    height: fontSizes.iconSmall,
  },
  mainView: {
    flex: 1,
    zIndex: 1,
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
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    height: '70%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flex: 1,
  },
  commitMessage: {
    fontSize: fontSizes.small,
    flex: 1,
  },
  commitAuthor: {
    fontSize: fontSizes.medium,
  },
  commitDate: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginHorizontal: horizontalScale(15),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  searchInput: {
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(10),
    flex: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
  },
  sortButton: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: horizontalScale(5),
  },
  selectedSort: {
    backgroundColor: '#ddd',
  },
  sortText: {
    fontSize: fontSizes.small,
    color: 'grey',
  },
  branchModalView: {
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  branchItem: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AllCommitsView;
