import React from 'react';
import { useBranchViewModel } from '../view-models/BranchViewModel';

interface BranchViewControllerProps {
  platform: string;
  owner: string;
  repository: string;
}

const BranchViewController = ({ platform, owner, repository }: BranchViewControllerProps) => {
  const { branches, loading, error, fetchBranches } = useBranchViewModel(platform, owner, repository);

  const getAllBranches = () => {
    fetchBranches();
  };

  return {
      branches,
      loading,
      error,
      getAllBranches
  };
};

export { BranchViewController };
