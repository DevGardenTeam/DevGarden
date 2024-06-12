import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import MarkdownDisplay from 'react-native-markdown-display';
import fontSizes from '../constants/fontSize';
import { useTheme } from '@react-navigation/native';

// Données mockées pour simuler les informations du projet Git
const mockData = {
  readmeContent: "## Titre du Projet\n\nCeci est un **exemple** de contenu README.md.",
  primaryLanguage: "JavaScript",
  commiters: [
    { id: 1, name: "John Doe", commits: 15, avatarUrl: "https://example.com/avatar1.png" },
    { id: 2, name: "Jane Smith", commits: 10, avatarUrl: "https://example.com/avatar2.png" },
    // Ajouter d'autres commiters si nécessaire
  ]
};

const DashboardScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text }]}>Project's Dashboard</Text>
      </View>

      {/* README Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Project</Text>
        <View style={{margin: 30,}}>
            <MarkdownDisplay>{mockData.readmeContent}</MarkdownDisplay>
        </View>
      </View>

      {/* Langage Principal */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Principal Language</Text>
        <View style={styles.languageContainer}>
          <Text style={[styles.languageText, { color: colors.text }]}>{mockData.primaryLanguage}</Text>
        </View>
      </View>

      {/* Liste des Commiters */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Commiters</Text>
        {mockData.commiters.map(committer => (
          <View key={committer.id} style={styles.commiterContainer}>
            <Image source={{ uri: committer.avatarUrl }} style={styles.avatar} />
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
    paddingHorizontal: 20,
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
  section: {
    marginBottom: 20,
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
