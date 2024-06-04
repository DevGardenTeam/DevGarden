import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface BreadcrumbsProps {
  pathHistory: string[];
  onBreadcrumbPress: (index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathHistory, onBreadcrumbPress }) => {
  const { colors } = useTheme();

  const getDisplayName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1] || '~';
  };

  return (
    <View style={styles.breadcrumbsContainer}>
      {pathHistory.map((path, index) => (
        <View key={index} style={styles.breadcrumbItem}>
          <TouchableOpacity onPress={() => onBreadcrumbPress(index)}>
            <Text style={[styles.breadcrumbText, { color: colors.text }]}>
              {getDisplayName(path)}
            </Text>
          </TouchableOpacity>
          {index < pathHistory.length - 1 && (
            <Text style={[styles.breadcrumbSeparator, { color: colors.text }]}> &gt; </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  breadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  breadcrumbSeparator: {
    fontSize: 16,
  },
});

export default Breadcrumbs;
