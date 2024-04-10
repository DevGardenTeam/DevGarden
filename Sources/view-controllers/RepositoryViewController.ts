import React from 'react';
import { useRepositoryViewModel } from '../view-models/RepositoryViewModel';

const RepositoryController = () => {
  const { repositories, repository, loading, error, fetchRepositories, fetchRepositoryById } = useRepositoryViewModel();

  const handleRepositoryPress = (repositoryId: any) => {
    console.log(`Navigating to details of repository ${repositoryId}`);
  };

  return {
      repositories,
      repository,
      loading,
      error,
      handleRepositoryPress,
      fetchRepositories,
      fetchRepositoryById
  };
};

export { RepositoryController };
