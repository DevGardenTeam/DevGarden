import React from 'react';
import { useFileViewModel } from '../view-models/FileViewModel';
import { File } from '../model/File';

interface FileViewControllerProps {
  platform: string;
  owner: string;
  repository: string;
}

const FileViewController = ({ platform, owner, repository }: FileViewControllerProps) => {
  const { files, loading, error, fetchFiles } = useFileViewModel(platform, owner, repository);

  const handleFilePress = (path?: string) => {
    fetchFiles(path);
  };

  const getAllFiles = () => {
    fetchFiles();
  };

  const fetchFirstFile = async (path?: string): Promise<File | null> => {
    const fetchedFiles = await fetchFiles(path);
    return fetchedFiles && fetchedFiles.length > 0 ? fetchedFiles[0] : null;
  };

  return {
      files,
      loading,
      error,
      handleFilePress,
      getAllFiles,
      fetchFirstFile
  };
};

export { FileViewController };
