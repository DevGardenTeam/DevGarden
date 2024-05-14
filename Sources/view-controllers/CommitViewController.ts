import React from 'react';
import { useCommitViewModel } from '../view-models/CommitViewModel';

interface CommitViewControllerProps {
  platform: string;
  owner: string;
  repository: string;
}

const CommitViewController = ({ platform, owner, repository }: CommitViewControllerProps) => {
  const { commits, loading, error, fetchCommits } = useCommitViewModel(platform, owner, repository);

  const handleCommitPress = (commitId: any) => {
    console.log(`Navigating to details of commit ${commitId}`);
  };

  const getAllCommits = () => {
    fetchCommits();
  };

  return {
      commits,
      loading,
      error,
      handleCommitPress,
      getAllCommits
  };
};

export { CommitViewController };
