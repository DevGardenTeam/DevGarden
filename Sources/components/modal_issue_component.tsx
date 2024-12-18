import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import fontSizes from '../constants/fontSize';


type ModalIssueComponentProps = {
   id: string;
   title: string;
   body: string;
   state: string;
   creationDate: string;
   author: string;
   onSelect: () => void;
};


const ModalIssueComponent: React.FC<ModalIssueComponentProps> = ({ id, title, body, state, creationDate, author, onSelect }) => {
   const { colors } = useTheme();


   return (
       <View style={styles.modalView}>
           <TouchableOpacity onPress={onSelect}>
               <Image source={require('../assets/icons/chevron_down.png')} style={[styles.closeImage, { tintColor: colors.text }]} />
           </TouchableOpacity>
           <View style={styles.topModalBar}>
               <View style={styles.userInfo}>
                   <View style={styles.squareContainer}>
                       <View style={[styles.statusIndicator, state === 'open' ? styles.openStatus : styles.closedStatus]} />
                   </View>
                   <View style={styles.userNameDate}>
                       <Text style={[styles.userName, { color: colors.text }]}>{title}</Text>
                       <Text style={[styles.date, { color: colors.text }]}>{creationDate}</Text>
                   </View>
               </View>
           </View>
           <Text style={[styles.message, { color: colors.text }]}>{body}</Text>
           <View style={styles.branchInfo}>
               <Text style={[styles.branch, { color: colors.text }]}>Author: {author}</Text>
               <Text style={[styles.commitId, { color: colors.text }]}>Issue ID: {id}</Text>
           </View>
       </View>
   );
};


const styles = StyleSheet.create({
   modalView: {
       flex: 1,
       padding: 20,
       backgroundColor: 'white',
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
       alignItems: 'center',
       justifyContent: 'space-between',
   },
   topModalBar: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       width: '100%',
       marginBottom: 20,
   },
   userInfo: {
       flexDirection: 'row',
       alignItems: 'center',
   },
   squareContainer: {
       width: fontSizes.iconMedium,
       height: fontSizes.iconMedium,
       borderRadius: fontSizes.iconSmall,
       overflow: 'hidden',
       marginRight: 10,
       justifyContent: 'center',
       alignItems: 'center',
   },
   statusIndicator: {
       width: fontSizes.iconMedium,
       height: fontSizes.iconMedium,
       borderRadius: fontSizes.iconSmall,
   },
   openStatus: {
       backgroundColor: 'green',
   },
   closedStatus: {
       backgroundColor: 'red',
   },
   userNameDate: {
       justifyContent: 'center',
   },
   userName: {
       fontSize: fontSizes.large,
       fontWeight: 'bold',
   },
   date: {
       fontSize: fontSizes.small,
       color: 'gray',
   },
   closeImage: {
       width: fontSizes.iconSmall,
       height: fontSizes.iconSmall,
   },
   message: {
       flex: 1,
       fontSize: fontSizes.medium,
       marginBottom: 20,
   },
   branchInfo: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: '100%',
   },
   branch: {
       fontSize: fontSizes.medium,
   },
   commitId: {
       fontSize: fontSizes.medium,
       color: 'gray',
   },
});


export default ModalIssueComponent;