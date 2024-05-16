import { useEffect, useState } from 'react';
import { IssueService } from '../service/IssueService';
import { Issue } from '../model/Issue';
import { IS_STUB } from '../constants/constants';
import { IssueStub } from '../stub/IssueStub';

export const useIssueViewModel = (platform: string, owner: string, repository: string) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    //En fonction de la constante IS_STUB, on implémente le Stub ou le Service
    const issueService = IS_STUB ? new IssueStub() : new IssueService();

  const fetchIssues = async () => {
    try {
      const result = await issueService.getMany({ platform, owner, repository });
      if (result.succeeded) {
        setIssues(result.data);
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
    fetchIssues();
  }, [platform, owner, repository]);

  return { issues, loading, error, fetchIssues };
};