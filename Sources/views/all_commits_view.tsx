import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import ButtonLabelIssueComponent from '../components/button_label_issue_component';

const AllCommitsView: React.FC = () => {
  
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Commits</Text>
                    <Text style={styles.titleTextBis}>(master)</Text>
                </View> 
                <View style={styles.contentView}>
                    <View style={styles.masterGraph}>
                        <Text>Toto</Text>
                    </View>
                    <View style={styles.masterLabel}>
                        <ButtonLabelIssueComponent title='#1565s8' image='test'></ButtonLabelIssueComponent>
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
        flexDirection: 'row'
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
    masterGraph: {
        display: 'flex',
        width: '50%',
        height: '100%',
    },
    masterLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        height: '100%',
    }
})
  
export default AllCommitsView;