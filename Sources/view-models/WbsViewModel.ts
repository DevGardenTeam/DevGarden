import { useEffect, useState } from 'react';
import { Task } from '../model/Task';

export const useWbsViewModel = (owner: string, repository: string) => {
  const [wbsTasks, setWbsTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWbsTasks = async () => {
    try {
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWbsTasks();
  }, []);

  return { wbsTasks, loading, error, fetchWbsTasks };
};