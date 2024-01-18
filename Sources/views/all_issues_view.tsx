import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import ButtonLabelIssueComponent from '../components/button_label_issue_component';

const AllIssuesView: React.FC = () => {
  
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Issues</Text>
                </View> 
                <View style={styles.contentView}>
                    <View style={styles.masterLabel}>
                        <ButtonLabelIssueComponent name={'Test Issue title'} isOpen={false} userCount={undefined}></ButtonLabelIssueComponent>
                    </View>
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
    masterLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    }
})
  
export default AllIssuesView;