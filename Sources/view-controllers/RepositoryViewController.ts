import React from 'react';
import { useRepositoryViewModel } from '../view-models/RepositoryViewModel';

interface RepositoryViewControllerProps {
  platform: string;
}

const RepositoryController = ({ platform }: RepositoryViewControllerProps) => {
  const { repositories, repository, loading, error, fetchRepositories, fetchRepositoryById } = useRepositoryViewModel(platform);

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
