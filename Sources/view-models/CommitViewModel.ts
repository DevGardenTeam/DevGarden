import { useEffect, useState } from 'react';
import { CommitService } from '../service/CommitService';
import { Commit } from '../model/Commit';
import { IS_STUB } from '../constants/constants';
import { CommitStub } from '../stub/CommitStub';
import RepositoryManager from '../managers/RepositoryManager';
import { Repository } from '../model/Repository';

export const useCommitViewModel = (platform: string, owner: string, repository: string) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //En fonction de la constante IS_STUB, on implémente le Stub ou le Service
  const commitService = IS_STUB ? new CommitStub() : new CommitService();

  const fetchCommits = async () => {
    var repositoryManager = RepositoryManager.getInstance();    
    try {
      const repo = await repositoryManager.getRepositoryByName(repository);
      
      if (repo?.commits.length === 0){
        const result = await commitService.getMany({ dgUsername: repositoryManager.dgUsername, platform, owner, repository });
        if (result.succeeded) {
          setCommits(result.data);
        } else {
          setError(result.errors);
        }  
      } 
      else{
        setCommits(repo?.commits || []);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, [platform, owner, repository]);

  return { commits, loading, error, fetchCommits };
};