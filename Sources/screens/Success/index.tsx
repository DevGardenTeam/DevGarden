import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles'

import axios from 'axios';

const owner = "runtenick";
const repo = "powerstep_";


export function Success({ route }) {
   
    const { accessToken } = route.params;

    console.log("aaa received on the success page => " + accessToken);
    console.log(repo);
    console.log(owner);

    const apiUrl = `https://localhost:7260/api/v1/DevGardenBranch/GetAllBranches?owner=${owner}&repository=${repo}&token=${accessToken}`
    console.log(apiUrl);

    axios.get(apiUrl)
        .then(response => {
            console.log("Success fetching all branches", response.data);
    })
    .catch(error => {
        console.error("Failed to fetch all branches", error);        
    });


    return(
        <View style={styles.container}>
            <Text>Success</Text>
        </View>
    )
}
