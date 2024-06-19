import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import MarkdownDisplay from 'react-native-markdown-display';
import fontSizes from '../constants/fontSize';
import { useRoute, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Repository } from '../model/Repository';
import { FileViewController } from '../view-controllers/FileViewController';
import { CommitViewController } from '../view-controllers/CommitViewController';
import { Member } from '../model/Member';
import { horizontalScale, verticalScale } from '../service/Metrics';
import { Buffer } from 'buffer';
import BackNavigationButton from '../components/button_back_navigation_component';
import LoadingComponent from '../components/loading_component';
import { useUser } from '../user/UserContext';

// Données mockées pour simuler les informations du projet Git
const mockData = {
  readmeContent: "## Titre du Projet\n\nCeci est un **exemple** de contenu README.md.",
  primaryLanguage: "JavaScript",
  commiters: [
    { id: 1, name: "John Doe", commits: 15, avatarUrl: "https://example.com/avatar1.png" },
    { id: 2, name: "Jane Smith", commits: 10, avatarUrl: "https://example.com/avatar2.png" },
  ]
};

interface DashboardScreenProps {
  navigation: StackNavigationProp<any>;
}

interface RouteParams {
  repository: Repository;
}

class Committer extends Member {
  commits: number;
  constructor(id: string, name: string, photoUrl: string, commits: number) {
    super(id, name, photoUrl, []);
    this.commits = commits;
  }
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const route = useRoute();
  const { repository } = route.params as RouteParams;
  const { colors } = useTheme();
  const user = useUser();

  const { files, loading: filesLoading, error: filesError, handleFilePress, getAllFiles, fetchFirstFile } = FileViewController({ dgUsername: user.user.username, platform: repository.platform, owner: repository.owner.name, repository: repository.name, id: repository.id });
  const { commits, loading: commitsLoading, error: commitsError, handleCommitPress, getAllCommits } = CommitViewController({ platform: repository.platform, owner: repository.owner.name, repository: repository.name });

  const [commitersData, setCommitersData] = useState<Committer[]>([]);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  useEffect(() => {
    getAllCommits();
    fetchReadmeContent();
  }, []);

  useEffect(() => {
    if (commits) {
      const commitersMap = new Map<string, Committer>();

      commits.forEach(commit => {
        const author = commit.author;
        if(author != null) {
          if (commitersMap.has(author.name)) {
            const existingAuthor = commitersMap.get(author.name);
            if (existingAuthor) {
              existingAuthor.commits += 1;
            }
          } else {
            commitersMap.set(author.name, new Committer(author.id, author.name, author.photoUrl, 1));
          }
        }
      });

      setCommitersData(Array.from(commitersMap.values()));
    }
  }, [commits]);

  const fetchReadmeContent = async () => {
    try {
      const readmeFile = await fetchFirstFile('README.md');
      if (readmeFile && readmeFile.encoding === 'base64') {
        const cleanedBase64 = readmeFile.content.replace(/[^A-Za-z0-9+/=]/g, '');
        const decodedContent = Buffer.from(cleanedBase64, 'base64').toString('utf-8');
        setReadmeContent(decodedContent);
      }
    } catch (error) {
      console.error('Error fetching README.md content:', error);
    }
  };

  if (filesLoading || commitsLoading) {
    return <LoadingComponent/>;
  }

  if (filesError || commitsError) {
    return <Text>Error: {filesError || commitsError}</Text>;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navigationBack}>
          <BackNavigationButton />
        </View>
        <Text style={[styles.headerText, { color: colors.text }]}>Project's Dashboard</Text>
        <View style={styles.navigationPlaceholder} />
      </View>

      {/* README Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Project</Text>
        <View style={{ margin: 30 }}>
          {readmeContent ? (
            <MarkdownDisplay>{readmeContent}</MarkdownDisplay>
          ) : (
            <Text style={{ color: colors.text }}>Loading README.md...</Text>
          )}
        </View>
      </View>

      {/* Langage Principal */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Principal Language</Text>
        <View style={styles.languageContainer}>
          <Text style={[styles.languageText, { color: colors.text }]}>{repository.language}</Text>
        </View>
      </View>

      {/* Liste des Commiters */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Commiters</Text>
        {commitersData.map(committer => (
          <View key={committer.name} style={styles.commiterContainer}>
            <Image source={{ uri: committer.photoUrl }} style={styles.avatar} />
            <View style={styles.commiterInfo}>
              <Text style={[styles.commiterName, { color: colors.text }]}>{committer.name}</Text>
              <Text style={[styles.commitCount, { color: colors.text }]}>{`${committer.commits} commits`}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: fontSizes.xlarge,
    fontWeight: 'bold',
    color: '#333',
  },
  navigationBack: {
    marginLeft: horizontalScale(15),
  },
  navigationPlaceholder: {
    width: horizontalScale(90),
  },
  section: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  languageContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  languageText: {
    fontSize: fontSizes.medium,
    color: '#333',
  },
  commiterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: fontSizes.iconMedium,
    height: fontSizes.iconMedium,
    borderRadius: fontSizes.iconSmall,
    marginRight: 10,
  },
  commiterInfo: {
    flex: 1,
  },
  commiterName: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: '#333',
  },
  commitCount: {
    fontSize: fontSizes.small,
    color: '#666',
  },
});

export default DashboardScreen;
