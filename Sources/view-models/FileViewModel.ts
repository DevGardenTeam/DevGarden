import { useEffect, useState } from 'react';
import { FileService } from '../service/FileService';
import { File } from '../model/File';
import { IS_STUB } from '../constants/constants';

export const useFileViewModel = (platform: string, owner: string, repository: string) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //En fonction de la constante IS_STUB, on implémente le Stub ou le Service
  const fileService = new FileService();

  const fetchFiles = async (path: string = ''): Promise<File[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await fileService.getMany({ platform, owner, repository, path });
      if (result.succeeded) {
        setFiles(result.data);
        return result.data;
      } else {
        setError(result.errors);
        return null;
      }
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [platform, owner, repository]);

  return { files, loading, error, fetchFiles };
};