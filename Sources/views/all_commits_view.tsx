import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StatusBar, TextInput } from 'react-native';
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


 const { commits, loading, error, handleCommitPress, getAllCommits } = CommitViewController({ platform: repository.platform, owner: repository.owner.name, repository: repository.name });


 useEffect(() => {
   getAllCommits();
 }, []);


 const filteredCommits = commits
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
   });


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
         <Text style={[styles.titleTextBis, { color: colors.text }]}> (master)</Text>
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
                     <Text style={[styles.commitMessage, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                       {item.message ?? ''}
                     </Text>
                     <Text style={[styles.commitAuthor, { color: colors.text }]}>
                       {item.author.name ?? ''}
                     </Text>
                     <Text style={[styles.commitDate, { color: colors.text }]}>
                       {item.date ? DateUtils.formatDate(item.date.toString()) : ''}
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
 titleText: {
   fontSize: fontSizes.xlarge,
   fontWeight: 'bold',
   textAlign: 'center',
 },
 titleTextBis: {
   fontSize: fontSizes.large,
   color: 'gray',
 },
 icon: {
   width: fontSizes.iconSmall,
   height: fontSizes.iconSmall,
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
   justifyContent: 'flex-end',
   margin: 0,
 },
 modalView: {
   height: '70%', // Ajustez la hauteur de la modal ici
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
 },
 commitMessage: {
   fontSize: fontSizes.large,
   fontWeight: 'bold',
 },
 commitAuthor: {
   fontSize: fontSizes.medium,
 },
 commitDate: {
   fontSize: fontSizes.medium,
 },
 searchContainer: {
   marginHorizontal: horizontalScale(15),
   marginBottom: verticalScale(15),
   flexDirection: 'row',
   alignItems: 'center',
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
});


export default AllCommitsView;