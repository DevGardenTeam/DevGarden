import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelIssueComponent from '../components/button_label_issue_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { IssueViewController } from '../view-controllers/IssueViewController';
import { Issue } from '../model/Issue';
import ModalIssueComponent from '../components/modal_issue_component';
import DateUtils from '../helper/DateUtils';
import { useTheme } from '@react-navigation/native';
import { Repository } from '../model/Repository';

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

    const { issues, loading, error, handleIssuePress, fetchIssues } = IssueViewController({ platform: repository.platform, owner: repository.owner.name, repository: repository.name });

    useEffect(() => {
        fetchIssues();
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
                <BackNavigationButton onPress={() => navigation.navigate("Project", {repository: repository})}/> 
            </View>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, { color: colors.text }]}>Issues</Text>
                </View> 
                <FlatList             
                    data={issues}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.itemContainer}
                            onPress={() => {
                                setModalVisible(true);
                                setSelectedItem(item);
                            }}
                        >
                            <View style={styles.textInfoContainer}>
                                <View style={styles.squareContainer}>
                                    <View style={[styles.statusIndicator, item.state === "open" ? styles.openStatus : styles.closedStatus]}/>
                                </View>
                                <View style={styles.textContainer}>
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
                        </TouchableOpacity>
                    )}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
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
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    backButton: {
        margin: 20,
    },
    mainView: {
        flex: 1,
        margin: 20,
    },
    titleView: {
        marginBottom: 20,
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    icon: {
        width: 24, 
        height: 24,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    textInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    textContainer: {
        flex: 1,
    },
    fileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fileDetails: {
        fontSize: 14,
        color: 'grey',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    squareContainer: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 60,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bordures
    },
    statusIndicator: {
        width: 30,
        height: 30,
        borderRadius: 60,
    },
    openStatus: {
        backgroundColor: 'green',
    },
    closedStatus: {
        backgroundColor: 'red',
    },
});

export default AllIssuesView;
