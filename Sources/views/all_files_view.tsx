import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { FileViewController } from '../view-controllers/FileViewController';
import { File } from '../model/File';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../service/Metrics';
import { WebView } from 'react-native-webview';
import Breadcrumbs from '../components/breadcrumbs';
import { Buffer } from 'buffer';
import { Repository } from '../model/Repository';
import fontSizes from '../constants/fontSize';
import { StatusBar } from 'react-native';
import LoadingComponent from '../components/loading_component';
import { useUser } from '../user/UserContext';


interface AllFilesViewProps {
  navigation: StackNavigationProp<any>;
}


interface RouteParams {
  repository: Repository;
}


const AllFilesView: React.FC<AllFilesViewProps> = ({ navigation }) => {
  const route = useRoute();
  const { repository } = route.params as RouteParams;
  const { colors } = useTheme();
  const user = useUser();


  const [pathHistory, setPathHistory] = useState<string[]>(['']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const { files, loading, error, handleFilePress, getAllFiles, fetchFirstFile } = FileViewController({ dgUsername: user.user.username, platform: repository.platform, owner: repository.owner.name, repository: repository.name, id: repository.id });


  useFocusEffect(
    React.useCallback(() => {
      getAllFiles();
    }, [repository])
  );


  if (loading) {
    return <LoadingComponent/>;
  }


  if (error) {
    return <Text>Error: {error}</Text>;
  }


  const handlePress = async (item: File) => {
    console.log(item);
    if (item.type === 'dir' || item.type === 'tree') {
      const newPath = item.path;
      setPathHistory(prevHistory => [...prevHistory, newPath]);
      await handleFilePress(newPath, true);
    } else {
      const firstFile = await fetchFirstFile(item.path);
      setSelectedFile(firstFile);
    }
  };


  const handleBackPress = async () => {
    if (selectedFile) {
      setSelectedFile(null);
      if (pathHistory.length > 0) {
        const currentPath = pathHistory[pathHistory.length - 1];
        await handleFilePress(currentPath);
      }
    } else if (pathHistory.length > 1) {
      const lastPath = pathHistory[pathHistory.length - 2];
      setPathHistory(prevHistory => prevHistory.slice(0, -1));
      await handleFilePress(lastPath);
    } else {
      navigation.goBack();
    }
  };


  const handleBreadcrumbPress = async (index: number) => {
    const newPathHistory = pathHistory.slice(0, index + 1);
    setPathHistory(newPathHistory);
    await handleFilePress(newPathHistory[newPathHistory.length - 1]);
  };


  const renderFileContent = (file: File) => {
    if (file.encoding === 'base64') {
      const fileType = (file.name.split('.').pop() || '').toLowerCase();
      if (fileType === 'pdf') {
        return (
          <WebView
            source={{ uri: `data:application/pdf;base64,${file.content}` }}
            style={{ flex: 1 }}
          />
        );
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
        return (
          <Image
            source={{ uri: `data:image/${fileType};base64,${file.content}` }}
            style={{ flex: 1, resizeMode: 'contain' }}
          />
        );
      }
    }


    try {
      const cleanedBase64 = file.content.replace(/[^A-Za-z0-9+/=]/g, '');
      const decodedContent = Buffer.from(cleanedBase64, 'base64').toString('utf-8');


      return (
        <ScrollView style={styles.fileContentContainer}>
          <Text style={{ color: colors.text }}>{decodedContent}</Text>
        </ScrollView>
      );
    } catch (e) {
      console.error("Error decoding base64 content", e);
      return (
        <ScrollView style={styles.fileContentContainer}>
          <Text style={{ color: colors.text }}>Error displaying content</Text>
        </ScrollView>
      );
    }
  };


  const renderItem = ({ item }: { item: File }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.textInfoContainer}>
          <Text style={[styles.fileName, { color: colors.text }]}>{item.name}</Text>
          {item.size > 0 && (
            <>
              <Text style={[styles.fileDetails, { color: colors.text }]}>
                Size: {item.size} bytes
              </Text>           
            </>
          )}


        </View>
        {(item.type === 'dir' || item.type === 'tree') && (
          <Image
            source={require('../assets/icons/right_arrow.png')}
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={[styles.safeAreaView, { backgroundColor: colors.background }]}>
      {selectedFile ? (
        <>
          <View style={styles.top}>
            <View style={styles.navigationBack}>
              <View style={styles.component}>
                <TouchableOpacity style={styles.button} onPress={handleBackPress}>
                  <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.backNavIcon, { tintColor: colors.text }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation?.navigate("Parameters")}>
                  <Image source={require('../assets/icons/settings.png')} style={[ styles.backNavIcon ]} />                
                </TouchableOpacity>              
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colors.text }]}>Files</Text>
            </View>
            <View style={styles.navigationPlaceholder} />
          </View>
          {renderFileContent(selectedFile)}
        </>
      ) : (
        <>
          <View style={styles.top}>
            <View style={styles.navigationBack}>
              <View style={styles.component}>
                <TouchableOpacity style={styles.button} onPress={handleBackPress}>
                  <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.backNavIcon, { tintColor: colors.text }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation?.navigate("Parameters")}>
                  <Image source={require('../assets/icons/settings.png')} style={[ styles.backNavIcon ]} />                
                </TouchableOpacity>              
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colors.text }]}>Files</Text>
            </View>
            <View style={styles.navigationPlaceholder} />
          </View>
          <Breadcrumbs pathHistory={pathHistory} onBreadcrumbPress={handleBreadcrumbPress} />
          <FlatList
            data={files}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: verticalScale(15),
  },
  navigationBack: {
    marginLeft: horizontalScale(15),
  },
  component: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: fontSizes.xlarge,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationPlaceholder: {
    width: horizontalScale(90),
  },
  backButton: {
    margin: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  fileName: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  fileDetails: {
    fontSize: fontSizes.small,
    flex: 1,
  },
  backNavIcon: {
    width: horizontalScale(35),
    height: horizontalScale(35),
  },
  icon: {
    width: fontSizes.iconSmall,
    height: fontSizes.iconSmall,
  },
  fileContentContainer: {
    flex: 1,
    padding: 16,
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});


export default AllFilesView;