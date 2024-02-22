import { useEffect, useState } from 'react';
import { CommitService } from '../service/CommitService';
import { Commit } from '../model/Commit';

export const useCommitViewModel = (owner: string, repository: string) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const commitService = new CommitService();

  const fetchCommits = async () => {
    try {
      const result = await commitService.getMany({ owner, repository });
      if (result.succeeded) {
        setCommits(result.data);
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
    fetchCommits();
  }, [owner, repository]);

  return { commits, loading, error, fetchCommits };
};