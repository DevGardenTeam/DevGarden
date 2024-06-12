import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StatusBar, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import ModalIssueComponent from '../components/modal_issue_component';
import { IssueViewController } from '../view-controllers/IssueViewController';
import { Issue } from '../model/Issue';
import DateUtils from '../helper/DateUtils';
import { useTheme } from '@react-navigation/native';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import { Repository } from '../model/Repository';
import Modal from 'react-native-modal';
import fontSizes from '../constants/fontSize';


interface AllIssuesViewProps {
 navigation: StackNavigationProp<any>;
}


interface RouteParams {
 repository: Repository;
}


const AllIssuesView: React.FC<AllIssuesViewProps> = ({ navigation }) => {
 const route = useRoute();
 const { repository } = route.params as RouteParams;
 const { colors } = useTheme();


 const [isModalVisible, setModalVisible] = useState(false);
 const [selectedItem, setSelectedItem] = useState<null | Issue>(null);
 const [searchText, setSearchText] = useState('');
 const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
 const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');


 const { issues, loading, error, handleIssuePress, fetchIssues } = IssueViewController({ platform: repository.platform, owner: repository.owner.name, repository: repository.name });


 useEffect(() => {
   fetchIssues();
 }, []);


 const filteredIssues = issues
   .filter(issue =>
     (issue.title.toLowerCase().includes(searchText.toLowerCase()) ||
     issue.body.toLowerCase().includes(searchText.toLowerCase())) &&
     (filter === 'all' || issue.state === filter)
   )
   .sort((a, b) => {
     if (sortOrder === 'asc') {
       return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
     } else {
       return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
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
         <Text style={[styles.titleText, { color: colors.text }]}>Issues</Text>
       </View>
       <View style={styles.navigationPlaceholder} />
     </View>


     <View style={styles.searchContainer}>
       <TextInput
         style={[styles.searchInput, { color: colors.text, borderColor: colors.border }]}
         placeholder="Search issues..."
         placeholderTextColor={colors.text}
         value={searchText}
         onChangeText={setSearchText}
       />
       <View style={styles.filterContainer}>
         <TouchableOpacity
           style={[styles.filterButton, filter === 'all' && styles.selectedFilter]}
           onPress={() => setFilter('all')}
         >
           <Text style={styles.filterText}>All</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.filterButton, filter === 'open' && styles.selectedFilter]}
           onPress={() => setFilter('open')}
         >
           <Text style={styles.filterText}>Open</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.filterButton, filter === 'closed' && styles.selectedFilter]}
           onPress={() => setFilter('closed')}
         >
           <Text style={styles.filterText}>Closed</Text>
         </TouchableOpacity>
       </View>
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
           data={filteredIssues}
           keyExtractor={(item) => item.id.toString()}
           renderItem={({ item }) => (
             <View style={styles.masterLabel}>
               <TouchableOpacity onPress={() => {
                 setModalVisible(true);
                 setSelectedItem(item);
               }}>
                 <View style={styles.itemContainer}>
                   <View style={styles.textInfoContainer}>
                     <View style={styles.squareContainer}>
                       <View style={[styles.statusIndicator, item.state === "open" ? styles.openStatus : styles.closedStatus]} />
                     </View>
                     <View>
                       <Text style={[styles.fileName, { color: colors.text }]}>
                         {item.title}
                       </Text>
                       <Text
                         style={[styles.fileDetails, { color: colors.text }]}
                         numberOfLines={1}
                         ellipsizeMode="tail"
                       >
                         {item.body}
                       </Text>
                     </View>
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
         isVisible={isModalVisible}
         onSwipeComplete={() => { setModalVisible(false); setSelectedItem(null); }}
         swipeDirection="down"
         onBackdropPress={() => { setModalVisible(false); setSelectedItem(null); }}
         onBackButtonPress={() => { setModalVisible(false); setSelectedItem(null); }}
         backdropOpacity={0.5}
       >
         <View style={styles.modalView}>
           <ModalIssueComponent
             id={selectedItem?.id ?? ''}
             title={selectedItem?.title ?? ''}
             body={selectedItem?.body ?? ''}
             state={selectedItem?.state ?? ''}
             creationDate={selectedItem?.creationDate ? DateUtils.formatDate(selectedItem.creationDate.toString()) : ''}
             author={selectedItem?.author.name ?? ''}
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
 titleContainer: {
   flex: 1,
   alignItems: 'center',
 },
 titleText: {
   fontSize: fontSizes.xlarge,
   fontWeight: 'bold',
   textAlign: 'center',
 },
 navigationPlaceholder: {
   width: horizontalScale(90),
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
 filterContainer: {
   flexDirection: 'row',
   marginLeft: horizontalScale(10),
 },
 filterButton: {
   paddingVertical: verticalScale(5),
   paddingHorizontal: horizontalScale(5),
   borderRadius: 5,
   borderWidth: 1,
   borderColor: '#ccc',
   marginLeft: horizontalScale(5),
 },
 selectedFilter: {
   backgroundColor: '#ddd',
 },
 filterText: {
   fontSize: fontSizes.small,
   color: 'grey',
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
 },
 fileName: {
   fontSize: fontSizes.large,
   fontWeight: 'bold',
 },
 fileDetails: {
   fontSize: fontSizes.medium,
   color: 'grey',
 },
 squareContainer: {
   width: fontSizes.iconSmall,
   height: fontSizes.iconSmall,
   borderWidth: 2,
   borderColor: '#ccc',
   borderRadius: fontSizes.iconMedium,
   alignContent: 'center',
   justifyContent: 'center',
   alignItems: 'center',
   overflow: 'hidden',
 },
 statusIndicator: {
   width: fontSizes.iconSmall,
   height: fontSizes.iconSmall,
   borderRadius: fontSizes.iconMedium,
 },
 openStatus: {
   backgroundColor: 'green',
 },
 closedStatus: {
   backgroundColor: 'red',
 },
});


export default AllIssuesView;