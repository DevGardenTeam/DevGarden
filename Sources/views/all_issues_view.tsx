import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelIssueComponent from '../components/button_label_issue_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { IssueViewController } from '../view-controllers/IssueViewController';
import { Issue } from '../model/Issue';
import ModalIssueComponent from '../components/modal_issue_component';
import DateUtils from '../helper/DateUtils';

interface AllIssuesViewProps {
    navigation: StackNavigationProp<any>;
}

interface RouteParams {
    owner: string;
    repository: string;
}

const AllIssuesView: React.FC<AllIssuesViewProps> = ({ navigation }) => {
    const route = useRoute();
    const { owner, repository } = route.params as RouteParams;

    const [isModalVisible, setModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<null | Issue>(null);

    const { issues, loading, error, handleIssuePress, fetchIssues } = IssueViewController({ owner, repository });

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
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.backButton}>
                <BackNavigationButton onPress={() => navigation.navigate("Project", {owner: owner, repository: repository})}/> 
            </View>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Issues</Text>
                </View> 
                <View style={styles.contentView}>
                    <FlatList             
                        style={styles.flatList}
                        data={issues}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.masterLabel}>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(true);
                                    setSelectedItem(item);
                                }}>
                                    <ButtonLabelIssueComponent name={item.title} isOpen={item.state === "open" ? true : false} userCount={item.labels.length}></ButtonLabelIssueComponent>
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
                    ></ModalIssueComponent>      
                </Modal>
            </View>
        </SafeAreaView>
    );
}
  
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
        display: 'flex'
    },
    titleView: {
        display: 'flex',
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
        color: 'gray'
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
})
  
export default AllIssuesView;