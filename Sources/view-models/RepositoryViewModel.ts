import { useEffect, useState } from 'react';
import { RepositoryService } from '../service/RepositoryService';
import { Repository } from '../model/Repository';

export const useRepositoryViewModel = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const repositoryService = new RepositoryService();

  const fetchRepositories = async () => {
    try {
      const result = await repositoryService.getMany();
      if (result.succeeded) {
        setRepositories(result.data);
      } else {
        setError(result.errors);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, error, fetchRepositories };
};