import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ButtonLabelIssueComponent from '../components/button_label_issue_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { IssueViewController } from '../view-controllers/IssueViewController';

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
                                <ButtonLabelIssueComponent name={item.name} isOpen={false} userCount={item.labels.length}></ButtonLabelIssueComponent>
                            </View>
                        )}
                    />
                </View>  
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
    }
})
  
export default AllIssuesView;