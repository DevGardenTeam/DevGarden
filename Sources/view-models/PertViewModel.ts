import { useEffect, useState } from 'react';
import { PertTask } from '../model/PertTask';

export const usePertViewModel = (owner: string, repository: string) => {
  const [pertTasks, setPertTasks] = useState<PertTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPertTasks = async () => {
    try {
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPertTasks();
  }, []);

  return { pertTasks, loading, error, fetchPertTasks };
};