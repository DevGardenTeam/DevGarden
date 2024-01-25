import React from 'react';
import { useRepositoryViewModel } from '../view-models/RepositoryViewModel';

const RepositoryController = () => {
  const { repositories, loading, error, fetchRepositories } = useRepositoryViewModel();

  const handleRepositoryPress = (repositoryId) => {
    console.log(`Navigating to details of repository ${repositoryId}`);
  };

  return {
      repositories,
      loading,
      error,
      handleRepositoryPress,
      fetchRepositories
  };
};

export { RepositoryController };
