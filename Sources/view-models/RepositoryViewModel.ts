import { useEffect, useState } from 'react';
import { RepositoryService } from '../service/RepositoryService';
import { Repository } from '../model/Repository';

export const useRepositoryViewModel = (platform: string) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const repositoryService = new RepositoryService();

  const fetchRepositories = async () => {
    try {
      const result = await repositoryService.getMany({ platform });
      if (result.succeeded) {
        setRepositories(result.data);
      } else {
        setError(result.errors);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositoryById = async (id: string) => {
    try {
      const result = await repositoryService.get(id);
      if (result.succeeded) {
        setRepository(result.data)
      } else {
        setError(result.errors);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [platform]);

  return { repositories, repository, loading, error, fetchRepositories, fetchRepositoryById };
};