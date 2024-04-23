import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import DateUtils from '../helper/DateUtils';
import ButtonPertElementComponent from '../components/button_pert_element_component';
import { PertTask } from '../model/PertTask';

interface PertViewProps {
    navigation: StackNavigationProp<any>;
}

interface RouteParams {
    owner: string;
    repository: string;
}

const PertView: React.FC<PertViewProps> = ({ navigation }) => {
    const route = useRoute();
    const { owner, repository } = route.params as RouteParams;

    const [isModalVisible, setModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<null | PertTask>(null);

    // const { issues, loading, error, handleIssuePress, fetchIssues } = IssueViewController({ owner, repository });

    // useEffect(() => {
    //     fetchIssues();
    // }, []);

    // if (loading) {
    //     return <ActivityIndicator size="large" />;
    // }

    // if (error) {
    //     return <Text>Error: {error}</Text>;
    // }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.backButton}>
                <BackNavigationButton onPress={() => navigation.navigate("ProjectManagement", {owner: owner, repository: repository})}/>
            </View>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>PERT</Text>
                </View> 
                <View style={styles.contentView}>
                    {/* <FlatList             
                        style={styles.flatList}
                        data={issues}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.masterLabel}>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(true);
                                    setSelectedItem(item);
                                }}>
                                    <ButtonPertElementComponent id='1'
                                                                members={[]}
                                                                duration='1'/>
                                </TouchableOpacity>
                            </View>
                        )}
                    /> */}
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(true);
                                    setSelectedItem(new PertTask("C1","Mise en place de l'ensemble des classes du projet", 30, 1, []));
                                }}>
                                    <ButtonPertElementComponent id='C1'
                                                                members={[]}
                                                                duration='20h'/>
                                </TouchableOpacity>
                </View> 
                <Modal
                    style={styles.modalContainer}
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {setModalVisible(false)}}>    
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
        display: 'flex'
    },
    titleView: {
        display: 'flex',
        margin: 20,
    },
    titleText: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 100,
    },
    titleTextBis: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 30,
        color: 'gray'
    },
    contentView: {
        display: 'flex',
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
  
export default PertView;