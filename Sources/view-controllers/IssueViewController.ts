import React from 'react';
import { useIssueViewModel } from '../view-models/IssueViewModel';

interface IssueViewControllerProps {
  owner: string;
  repository: string;
}

const IssueViewController = ({ owner, repository }: IssueViewControllerProps) => {
  const { issues, loading, error, fetchIssues } = useIssueViewModel(owner, repository);

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
