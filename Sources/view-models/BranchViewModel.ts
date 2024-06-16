import { useEffect, useState } from 'react';
import { BranchService } from '../service/BranchService';
import { Branch } from '../model/Branch';
import { IS_STUB } from '../constants/constants';
import RepositoryManager from '../managers/RepositoryManager';

export const useBranchViewModel = (platform: string, owner: string, repository: string) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //En fonction de la constante IS_STUB, on implémente le Stub ou le Service
  const branchService = new BranchService();

  const fetchBranches = async () => {
    var repositoryManager = RepositoryManager.getInstance();    
    try {
      const repo = await repositoryManager.getRepositoryByName(repository);
      
      if (repo?.branches.length === 0){
        const result = await branchService.getMany({ platform, owner, repository });
        if (result.succeeded) {
          setBranches(result.data);
        } else {
          setError(result.errors);
        }  
      } 
      else{
        setBranches(repo?.branches || []);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [platform, owner, repository]);

  return { branches, loading, error, fetchBranches };
};