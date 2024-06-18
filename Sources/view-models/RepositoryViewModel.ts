import { useEffect, useState } from 'react';
import { RepositoryService } from '../service/RepositoryService';
import { Repository } from '../model/Repository';
import { RepositoryStub } from '../stub/RepositoryStub';
import { IS_STUB } from '../constants/constants';
import RepositoryManager from '../managers/RepositoryManager';

export const useRepositoryViewModel = (platform: string, username: string) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //En fonction de la constante IS_STUB, on implémente le Stub ou le Service
  const repositoryService = IS_STUB ? new RepositoryStub() : new RepositoryService();

  const fetchRepositories = async () => {
    var repositories = [];

    var repositoryManager = RepositoryManager.getInstance(username);
    // Fetch all repositories from every platform
      try {
        //console.warn("Fetching repositories ...")
        repositories = await repositoryManager.getRepositories();
        //console.warn("Repositories fetched: ", repositories)
        setRepositories(repositories);
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

  return { repositories, repository, loading, error, fetchRepositories, fetchRepositoryById };
};