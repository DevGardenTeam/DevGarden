import React from 'react';
import { useCommitViewModel } from '../view-models/CommitViewModel';

const CommitViewController = () => {
  const { commits, loading, error, fetchCommits } = useCommitViewModel();

  const handleCommitPress = (commitId: any) => {
    console.log(`Navigating to details of commit ${commitId}`);
  };

  return {
      commits,
      loading,
      error,
      handleCommitPress,
      fetchCommits
  };
};

export { CommitViewController };
