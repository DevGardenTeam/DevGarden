import { useEffect, useState } from 'react';
import { IssueService } from '../service/IssueService';
import { Issue } from '../model/Issue';

export const useIssueViewModel = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Issue>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const issueService = new IssueService();

  const fetchIssues = async () => {
    try {
      const result = await issueService.getMany();
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
  }, []);

  return { issues, loading, error, fetchIssues };
};