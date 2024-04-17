import React from 'react';
import { usePertViewModel } from '../view-models/PertViewModel';

interface PertViewControllerProps {
  owner: string;
  repository: string;
}

const PertViewController = ({ owner, repository }: PertViewControllerProps) => {
  const { pertTasks, loading, error, fetchPertTasks } = usePertViewModel(owner, repository);

  return {

  };
};

export { PertViewController };
