import React from 'react';
import { useCommitViewModel } from '../view-models/CommitViewModel';

interface CommitViewControllerProps {
  owner: string;
  repository: string;
}

const CommitViewController = ({ owner, repository }: CommitViewControllerProps) => {
  const { commits, loading, error, fetchCommits } = useCommitViewModel(owner, repository);

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
