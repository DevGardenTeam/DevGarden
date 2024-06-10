import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ModalCommitComponentProps = {
    image: string;
    username: string;
    date: string;
    message: string;
    branch: string;
    id: string;
    onSelect: () => void;
};

const ModalCommitComponent: React.FC<ModalCommitComponentProps> = ({ image, username, date, message, branch, id, onSelect }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.modalView}>
            <TouchableOpacity onPress={onSelect}>
                <Image source={require('../assets/icons/close.png')} style={[styles.closeImage, { tintColor: colors.text }]} />
            </TouchableOpacity>
            <View style={styles.topModalBar}>
                <View style={styles.userInfo}>
                    <View style={styles.squareContainer}>
                        <Image source={{ uri: image }} style={styles.userImage} />
                    </View>
                    <View style={styles.userNameDate}>
                        <Text style={[styles.userName, { color: colors.text }]}>{username}</Text>
                        <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
                    </View>
                </View>
            </View>
            <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
            <View style={styles.branchInfo}>
                <Text style={[styles.branch, { color: colors.text }]}>Branch: {branch}</Text>
                <Text style={[styles.commitId, { color: colors.text }]}>Commit ID: {id}</Text>
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
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
    userNameDate: {
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    closeImage: {
        width: 30,
        height: 30,
    },
    message: {
        flex: 1,
        fontSize: 16,
        marginBottom: 20,
    },
    branchInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    branch: {
        fontSize: 16,
    },
    commitId: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ModalCommitComponent;
