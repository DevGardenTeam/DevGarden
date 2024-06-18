import React from 'react';
import { useRepositoryViewModel } from '../view-models/RepositoryViewModel';

interface RepositoryViewControllerProps {
  platform: string;
  username: string;
}

const RepositoryController = ({ platform, username }: RepositoryViewControllerProps) => {
  const { repositories, repository, loading, error, fetchRepositories, fetchRepositoryById } = useRepositoryViewModel(platform, username);

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
