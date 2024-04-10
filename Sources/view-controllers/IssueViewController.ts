import React from 'react';
import { useIssueViewModel } from '../view-models/IssueViewModel';

const IssueViewController = () => {
  const { issues, loading, error, fetchIssues } = useIssueViewModel();

  const handleIssuePress = (issueId: any) => {
    console.log(`Navigating to details of issue ${issueId}`);
  };

  return {
      issues,
      loading,
      error,
      handleIssuePress,
      fetchIssues
  };
};

export { IssueViewController };
