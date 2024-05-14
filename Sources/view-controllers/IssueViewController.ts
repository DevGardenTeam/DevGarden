import React from 'react';
import { useIssueViewModel } from '../view-models/IssueViewModel';

interface IssueViewControllerProps {
  platform: string,
  owner: string;
  repository: string;
}

const IssueViewController = ({ platform, owner, repository }: IssueViewControllerProps) => {
  const { issues, loading, error, fetchIssues } = useIssueViewModel(platform, owner, repository);

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
