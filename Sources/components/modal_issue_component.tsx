import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Member } from '../model/Member';

type ModalIssueComponent = {
    id: string;
    title: string;
    body: string;
    state: string;
    creationDate: string;
    author: string;
    onSelect: () => void;
}

const ModalIssueComponent: React.FC<ModalIssueComponent> = ({ id, title, body, state, creationDate, author, onSelect }) => {

  return (
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.topModalBar}>
                <View style={styles.userInfo}>
                    <View style={styles.squareContainer}>
                        <View style={[styles.statusIndicator, state ? styles.openStatus : styles.closedStatus]} />
                    </View>
                    <View style={styles.userNameDate}>
                        <Text style={styles.userName}>{title}</Text>
                        <Text style={styles.date}>{creationDate}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onSelect}>
                    <Image source={require('../assets/icons/close.png')} style={styles.closeImage} />   
                </TouchableOpacity>                 
            </View>
            <Text style={styles.message}>{body}</Text>

            <View style={styles.branchInfo}>
                <Text style={styles.branch}>{author}</Text>
                <Text style={styles.commitId}>{id}</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: '50%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    topModalBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '30%',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    squareContainer: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 60,
        marginRight: 16,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bordures
    },
    statusIndicator: {
      width: 80,
      height: 80,
      borderRadius: 60,
    },
    openStatus: {
        backgroundColor: 'green',
    },
    closedStatus: {
        backgroundColor: 'red',
    },
    userImage: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    userNameDate: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        color: 'gray',
    },
    closeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        marginVertical: 10,
        height: '30%',
    },
    branchInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: '30%',
    },
    branch: {
        fontSize: 16,
    },
    commitId: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ModalIssueComponent;