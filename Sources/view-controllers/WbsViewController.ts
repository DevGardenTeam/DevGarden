import React from 'react';
import { useWbsViewModel } from '../view-models/WbsViewModel';

interface WbsViewControllerProps {
  owner: string;
  repository: string;
}

const WbsViewController = ({ owner, repository }: WbsViewControllerProps) => {
  const { wbsTasks, loading, error, fetchWbsTasks } = useWbsViewModel(owner, repository);

  return {

  };
};

export { WbsViewController };
