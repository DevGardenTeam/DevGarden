import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import BackNavigationButton from '../components/button_back_navigation_component';
import AccordionItem from '../components/accordion_item_component';
import { Task } from '../model/Task';
import ButtonVerticalAddComponent from '../components/button_vertical_add_component';
import { WbsViewController } from '../view-controllers/WbsViewController';
import { useTheme } from '@react-navigation/native';
import ButtonWbsComponent from '../components/button_wbs_component';
import { Repository } from '../model/Repository';

interface WbsViewProps {
    navigation: StackNavigationProp<any>;
}

interface RouteParams {
    repository: Repository;
}

const WbsView: React.FC<WbsViewProps> = ({ navigation }) => {
    const route = useRoute();
    const { repository } = route.params as RouteParams;0
    const { colors } = useTheme();
    
    const { wbsTasks, loading, error, fetchWbsTasks, fetchWbsCategories, fetchWbsTasksByCategory, addWbsCategory, addWbsTaskToCategory } = WbsViewController({ owner: repository.owner.name, repository: repository.name })

    const [categoriesWithTasks, setCategoriesWithTasks] = useState<Map<string, Task[]>>(new Map());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await fetchWbsCategories();
                const categoriesMap = new Map<string, Task[]>();

                for (const category of categories) {
                    const tasks = await fetchWbsTasksByCategory(category);
                    categoriesMap.set(category, tasks);
                }

                setCategoriesWithTasks(categoriesMap);
            } catch (error) {
                console.error("Erreur pendant la récupération des données : ", error);
            }
        };

        fetchData();
    }, []);

    const handleAddCategory = async () => {
        try {
            await addWbsCategory("Nouvelle catégorie");

            const updatedCategories = await fetchWbsCategories();
            const categoriesMap = new Map<string, Task[]>();
    
            for (const category of updatedCategories) {
                const tasks = await fetchWbsTasksByCategory(category);
                categoriesMap.set(category, tasks);
            }
    
            setCategoriesWithTasks(categoriesMap);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie : ", error);
        }
    };
    
    const handleAddTask = async () => {
        try {
            await addWbsTaskToCategory("Nom de la catégorie", new Task("ID", "Titre de la tâche"));

            const updatedTasks = await fetchWbsTasksByCategory("Nom de la catégorie");
            setCategoriesWithTasks(prevState => {
                const newCategoriesMap = new Map(prevState);
                newCategoriesMap.set("Nom de la catégorie", updatedTasks);
                return newCategoriesMap;
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche : ", error);
        }
    };

    return (
        <View style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
            <View style={styles.backButton}>
                <BackNavigationButton />
            </View>
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, { color: colors.text }]}>WBS</Text>
                </View> 
                <View style={styles.contentView}>
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : error ? (
                        <Text>Error: {error}</Text>
                    ) : (
                        Array.from(categoriesWithTasks).map(([category, tasks]) => (
                            <AccordionItem key={category} id={category} title={category}>
                                    <FlatList
                                        data={tasks}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <ButtonWbsComponent id={item.id} title={item.title}/>
                                        )}
                                    />                                    
                            </AccordionItem>
                        ))
                    )}
                </View>
            </View>
            <View style={styles.optionsButtons}>
                <ButtonVerticalAddComponent title={'Ajouter une catégorie'} onPress={handleAddCategory}/>
                <ButtonVerticalAddComponent title={'Ajouter une tâche'} onPress={handleAddTask}/>
            </View>
        </View>
    );
}
  
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    backButton:{
        margin: 20,
    },
    mainView: {
        flex: 1,
        display: 'flex',
    },
    titleView: {
        display: 'flex',
        margin: 20,
    },
    titleText: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 100,
        fontWeight: 'bold',
    },
    contentView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: '10%',
        marginRight: '10%',
    },
    optionsButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '5%',
    },
})
  
export default WbsView;